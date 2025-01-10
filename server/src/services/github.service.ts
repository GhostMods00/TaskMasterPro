// src/services/integrations/github.service.ts
import { Octokit } from '@octokit/rest';
import { Project } from '../../models';
import { AppError } from '../../middleware/error.middleware';

export class GitHubService {
  private octokit: Octokit;

  constructor(private accessToken: string) {
    this.octokit = new Octokit({ auth: accessToken });
  }

  async linkRepository(projectId: number, repo: string, branch: string) {
    try {
      // Verify repository access
      const [owner, repoName] = repo.split('/');
      await this.octokit.repos.get({
        owner,
        repo: repoName
      });

      // Store GitHub integration settings
      await Project.update(
        {
          githubRepo: repo,
          githubBranch: branch
        },
        { where: { id: projectId } }
      );

      // Setup webhooks
      await this.octokit.repos.createWebhook({
        owner,
        repo: repoName,
        config: {
          url: `${process.env.API_URL}/webhooks/github`,
          content_type: 'json',
          secret: process.env.GITHUB_WEBHOOK_SECRET
        },
        events: ['push', 'pull_request']
      });

    } catch (error) {
      throw new AppError(400, 'Failed to link GitHub repository');
    }
  }

  async getRecentActivity(repo: string) {
    const [owner, repoName] = repo.split('/');
    
    // Get recent commits
    const { data: commits } = await this.octokit.repos.listCommits({
      owner,
      repo: repoName,
      per_page: 5
    });

    // Get recent pull requests
    const { data: pullRequests } = await this.octokit.pulls.list({
      owner,
      repo: repoName,
      state: 'all',
      per_page: 5
    });

    return {
      commits: commits.map(commit => ({
        id: commit.sha,
        message: commit.commit.message,
        author: commit.commit.author?.name,
        date: commit.commit.author?.date
      })),
      pullRequests: pullRequests.map(pr => ({
        id: pr.number,
        title: pr.title,
        state: pr.state,
        author: pr.user?.login,
        createdAt: pr.created_at
      }))
    };
  }

  async createIssue(repo: string, title: string, body: string, labels: string[]) {
    const [owner, repoName] = repo.split('/');
    
    const { data: issue } = await this.octokit.issues.create({
      owner,
      repo: repoName,
      title,
      body,
      labels
    });

    return issue;
  }
}

// src/services/integrations/slack.service.ts
import { WebClient } from '@slack/web-api';
import { Project } from '../../models';
import { AppError } from '../../middleware/error.middleware';

export class SlackService {
  private client: WebClient;

  constructor(private token: string) {
    this.client = new WebClient(token);
  }

  async sendTaskNotification(projectId: number, data: any) {
    try {
      const project = await Project.findByPk(projectId);
      if (!project?.slackChannel) return;

      const message = this.formatTaskMessage(data);
      
      await this.client.chat.postMessage({
        channel: project.slackChannel,
        text: message.text,
        blocks: message.blocks
      });
    } catch (error) {
      console.error('Slack notification error:', error);
    }
  }

  async sendDailyDigest(projectId: number) {
    try {
      const project = await Project.findByPk(projectId, {
        include: ['tasks', 'members']
      });

      if (!project?.slackChannel) return;

      const digest = await this.generateDailyDigest(project);
      
      await this.client.chat.postMessage({
        channel: project.slackChannel,
        text: 'Daily Project Digest',
        blocks: digest
      });
    } catch (error) {
      console.error('Slack digest error:', error);
    }
  }

  private formatTaskMessage(data: any) {
    const { type, task, comment } = data;
    
    switch (type) {
      case 'new_task':
        return {
          text: `New task created: ${task.title}`,
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*New Task Created*\n*${task.title}*\n${task.description}`
              }
            },
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `Priority: ${task.priority} | Assignee: ${task.assignee?.username || 'Unassigned'}`
                }
              ]
            }
          ]
        };

      case 'status_change':
        return {
          text: `Task status updated: ${task.title}`,
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Task Status Updated*\n*${task.title}*\nNew Status: ${task.status}`
              }
            }
          ]
        };

      // Add other message types as needed
      default:
        return {
          text: 'Task update',
          blocks: []
        };
    }
  }

  private async generateDailyDigest(project: any) {
    // Generate digest blocks for Slack message
    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `📊 Daily Digest: ${project.title}`
        }
      },
      // Add more digest sections
    ];

    return blocks;
  }
}
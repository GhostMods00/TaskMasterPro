"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackService = exports.GitHubService = void 0;
const rest_1 = require("@octokit/rest");
const models_1 = require("../../models");
const error_middleware_1 = require("../../middleware/error.middleware");
class GitHubService {
    constructor(accessToken) {
        this.accessToken = accessToken;
        this.octokit = new rest_1.Octokit({ auth: accessToken });
    }
    linkRepository(projectId, repo, branch) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [owner, repoName] = repo.split('/');
                yield this.octokit.repos.get({
                    owner,
                    repo: repoName
                });
                yield models_1.Project.update({
                    githubRepo: repo,
                    githubBranch: branch
                }, { where: { id: projectId } });
                yield this.octokit.repos.createWebhook({
                    owner,
                    repo: repoName,
                    config: {
                        url: `${process.env.API_URL}/webhooks/github`,
                        content_type: 'json',
                        secret: process.env.GITHUB_WEBHOOK_SECRET
                    },
                    events: ['push', 'pull_request']
                });
            }
            catch (error) {
                throw new error_middleware_1.AppError(400, 'Failed to link GitHub repository');
            }
        });
    }
    getRecentActivity(repo) {
        return __awaiter(this, void 0, void 0, function* () {
            const [owner, repoName] = repo.split('/');
            const { data: commits } = yield this.octokit.repos.listCommits({
                owner,
                repo: repoName,
                per_page: 5
            });
            const { data: pullRequests } = yield this.octokit.pulls.list({
                owner,
                repo: repoName,
                state: 'all',
                per_page: 5
            });
            return {
                commits: commits.map(commit => {
                    var _a, _b;
                    return ({
                        id: commit.sha,
                        message: commit.commit.message,
                        author: (_a = commit.commit.author) === null || _a === void 0 ? void 0 : _a.name,
                        date: (_b = commit.commit.author) === null || _b === void 0 ? void 0 : _b.date
                    });
                }),
                pullRequests: pullRequests.map(pr => {
                    var _a;
                    return ({
                        id: pr.number,
                        title: pr.title,
                        state: pr.state,
                        author: (_a = pr.user) === null || _a === void 0 ? void 0 : _a.login,
                        createdAt: pr.created_at
                    });
                })
            };
        });
    }
    createIssue(repo, title, body, labels) {
        return __awaiter(this, void 0, void 0, function* () {
            const [owner, repoName] = repo.split('/');
            const { data: issue } = yield this.octokit.issues.create({
                owner,
                repo: repoName,
                title,
                body,
                labels
            });
            return issue;
        });
    }
}
exports.GitHubService = GitHubService;
const web_api_1 = require("@slack/web-api");
class SlackService {
    constructor(token) {
        this.token = token;
        this.client = new web_api_1.WebClient(token);
    }
    sendTaskNotification(projectId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield models_1.Project.findByPk(projectId);
                if (!(project === null || project === void 0 ? void 0 : project.slackChannel))
                    return;
                const message = this.formatTaskMessage(data);
                yield this.client.chat.postMessage({
                    channel: project.slackChannel,
                    text: message.text,
                    blocks: message.blocks
                });
            }
            catch (error) {
                console.error('Slack notification error:', error);
            }
        });
    }
    sendDailyDigest(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield models_1.Project.findByPk(projectId, {
                    include: ['tasks', 'members']
                });
                if (!(project === null || project === void 0 ? void 0 : project.slackChannel))
                    return;
                const digest = yield this.generateDailyDigest(project);
                yield this.client.chat.postMessage({
                    channel: project.slackChannel,
                    text: 'Daily Project Digest',
                    blocks: digest
                });
            }
            catch (error) {
                console.error('Slack digest error:', error);
            }
        });
    }
    formatTaskMessage(data) {
        var _a;
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
                                    text: `Priority: ${task.priority} | Assignee: ${((_a = task.assignee) === null || _a === void 0 ? void 0 : _a.username) || 'Unassigned'}`
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
            default:
                return {
                    text: 'Task update',
                    blocks: []
                };
        }
    }
    generateDailyDigest(project) {
        return __awaiter(this, void 0, void 0, function* () {
            const blocks = [
                {
                    type: 'header',
                    text: {
                        type: 'plain_text',
                        text: `📊 Daily Digest: ${project.title}`
                    }
                },
            ];
            return blocks;
        });
    }
}
exports.SlackService = SlackService;
//# sourceMappingURL=github.service.js.map
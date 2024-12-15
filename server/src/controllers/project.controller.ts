import { Response } from 'express';
import { Project, Task } from '../models';
import { AuthRequest } from '../middleware/auth.middleware';
import { ProjectParams, CreateProjectBody, UpdateProjectBody } from '../types/params';

export const createProject = async (
  req: AuthRequest<{}, {}, CreateProjectBody>,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { title, description, startDate, dueDate } = req.body;
    const project = await Project.create({
      title,
      description,
      startDate,
      dueDate,
      ownerId: req.user.id,
      status: 'planning',
      id: 0
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Project creation error:', error);
    res.status(500).json({ message: 'Error creating project' });
  }
};

export const getProjects = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const projects = await Project.findAll({
      where: { ownerId: req.user.id },
      include: [{
        model: Task,
        attributes: ['id', 'title', 'status', 'priority']
      }]
    });

    res.json(projects);
  } catch (error) {
    console.error('Project fetch error:', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

export const getProjectById = async (
  req: AuthRequest<ProjectParams>,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const project = await Project.findOne({
      where: { 
        id: req.params.id,
        ownerId: req.user.id
      },
      include: [{
        model: Task,
        attributes: ['id', 'title', 'status', 'priority', 'dueDate']
      }]
    });

    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    res.json(project);
  } catch (error) {
    console.error('Project fetch error:', error);
    res.status(500).json({ message: 'Error fetching project' });
  }
};

export const updateProject = async (
  req: AuthRequest<ProjectParams, {}, UpdateProjectBody>,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const project = await Project.findOne({
      where: { 
        id: req.params.id,
        ownerId: req.user.id
      }
    });

    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    await project.update(req.body);
    res.json(project);
  } catch (error) {
    console.error('Project update error:', error);
    res.status(500).json({ message: 'Error updating project' });
  }
};

export const deleteProject = async (
  req: AuthRequest<ProjectParams>,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const project = await Project.findOne({
      where: { 
        id: req.params.id,
        ownerId: req.user.id
      }
    });

    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    await project.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Project deletion error:', error);
    res.status(500).json({ message: 'Error deleting project' });
  }
};
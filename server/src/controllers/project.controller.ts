// src/controllers/project.controller.ts

// src/controllers/project.controller.ts
import { Request, Response } from 'express';
import db from '../models'; // Import the db object
import { Op } from 'sequelize';

const { Project } = db; // Extract Project from the models

// Create a new project
export const createProject = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, description, status, startDate, dueDate } = req.body;
    const userId = (req as any).user.id;

    const project = await Project.create({
      title,
      description,
      status,
      startDate,
      dueDate,
      ownerId: userId,
    });

    return res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    return res.status(500).json({ message: 'Error creating project', error });
  }
};

// Get all projects
export const getProjects = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req as any).user.id;
    const { search, status } = req.query;

    const whereClause: any = {
      [Op.or]: [
        { ownerId: userId },
      ],
    };

    if (status) whereClause.status = status;

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const projects = await Project.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
    });

    return res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    return res.status(500).json({ message: 'Error fetching projects', error });
  }
};

// Get a specific project by ID
export const getProjectById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const project = await Project.findOne({
      where: {
        id,
        ownerId: userId,
      },
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    return res.status(500).json({ message: 'Error fetching project', error });
  }
};

// Update a project
export const updateProject = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const { title, description, status, startDate, dueDate } = req.body;

    const project = await Project.findOne({
      where: {
        id,
        ownerId: userId,
      },
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.update({
      title,
      description,
      status,
      startDate,
      dueDate,
    });

    return res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    return res.status(500).json({ message: 'Error updating project', error });
  }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const deleted = await Project.destroy({
      where: {
        id,
        ownerId: userId,
      },
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    return res.status(500).json({ message: 'Error deleting project', error });
  }
};

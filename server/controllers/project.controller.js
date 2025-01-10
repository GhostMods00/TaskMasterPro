const { Project } = require('../models');

// Create a New Project
exports.createProject = async (req, res) => {
    try {
        const { name, description, ownerId } = req.body;

        // Input Validation
        if (!name || !ownerId) {
            return res.status(400).json({ message: 'Name and ownerId are required' });
        }

        // Check for Duplicate Project Name
        const existingProject = await Project.findOne({ where: { name } });
        if (existingProject) {
            return res.status(400).json({ message: 'Project with this name already exists' });
        }

        // Create the Project
        const project = await Project.create({ name, description, ownerId });
        return res.status(201).json({
            message: 'Project created successfully',
            project,
        });
    } catch (error) {
        console.error('Error creating project:', error.message);
        res.status(500).json({ message: 'Failed to create project', error: error.message });
    }
};

// Fetch All Projects with Optional Filtering
exports.getAllProjects = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const offset = (page - 1) * limit;

        const projects = await Project.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        res.status(200).json({
            total: projects.count,
            pages: Math.ceil(projects.count / limit),
            data: projects.rows,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
    }
};

// Update Project
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const project = await Project.findByPk(id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        await project.update({ name, description });
        res.status(200).json({ message: 'Project updated successfully', project });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update project', error: error.message });
    }
};

// Delete Project
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findByPk(id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        await project.destroy();
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete project', error: error.message });
    }
};

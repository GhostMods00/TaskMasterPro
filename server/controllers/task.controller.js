const { Task } = require('../models');

// Create Task
exports.createTask = async (req, res) => {
    try {
        const { title, description, projectId, assignedTo, dueDate } = req.body;

        const task = await Task.create({ title, description, projectId, assignedTo, dueDate });

        // Emit socket event
        req.io.emit('taskCreated', task);

        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create task', error: error.message });
    }
};

// Get All Tasks by Project ID
exports.getTasks = async (req, res) => {
    try {
        const { projectId } = req.params;

        const tasks = await Task.findAll({ where: { projectId } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, assignedTo, dueDate } = req.body;

        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await task.update({ title, description, assignedTo, dueDate });
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task', error: error.message });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await task.destroy();
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task', error: error.message });
    }
};

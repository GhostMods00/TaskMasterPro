const { TeamMember } = require('../models');

// Get All Team Members
exports.getTeamMembers = async (req, res) => {
    try {
        const teamMembers = await TeamMember.findAll();
        res.status(200).json(teamMembers);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch team members', error: error.message });
    }
};

// Add Team Member
exports.addTeamMember = async (req, res) => {
    try {
        const { name, role, email } = req.body;

        const teamMember = await TeamMember.create({ name, role, email });
        res.status(201).json({ message: 'Team member added successfully', teamMember });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add team member', error: error.message });
    }
};

// Update Team Member
exports.updateTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, email } = req.body;

        const teamMember = await TeamMember.findByPk(id);
        if (!teamMember) return res.status(404).json({ message: 'Team member not found' });

        await teamMember.update({ name, role, email });
        res.status(200).json({ message: 'Team member updated successfully', teamMember });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update team member', error: error.message });
    }
};

// Delete Team Member
exports.deleteTeamMember = async (req, res) => {
    try {
        const { id } = req.params;

        const teamMember = await TeamMember.findByPk(id);
        if (!teamMember) return res.status(404).json({ message: 'Team member not found' });

        await teamMember.destroy();
        res.status(200).json({ message: 'Team member deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete team member', error: error.message });
    }
};

// controllers/project.controller.js
const createProject = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const project = await Project.create({
      title,
      description,
      dueDate,
      UserId: req.user.id
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project' });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { UserId: req.user.id },
      include: [
        {
          model: Task,
          attributes: ['id', 'title', 'status']
        }
      ]
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};
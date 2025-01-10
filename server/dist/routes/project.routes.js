"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const project_controller_1 = require("../controllers/project.controller");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.post('/', project_controller_1.createProject);
router.get('/', project_controller_1.getProjects);
router.get('/:id', project_controller_1.getProjectById);
router.put('/:id', project_controller_1.updateProject);
router.delete('/:id', project_controller_1.deleteProject);
exports.default = router;
//# sourceMappingURL=project.routes.js.map
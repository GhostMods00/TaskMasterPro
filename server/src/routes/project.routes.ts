import express, { Router, Response, RequestHandler } from 'express';
import { body, param } from 'express-validator';
import { 
  createProject, 
  getProjects, 
  getProjectById,
  updateProject,
  deleteProject 
} from '../controllers/project.controller';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';

const router: Router = express.Router();

const projectValidation = [
  body('title').trim().isLength({ min: 1, max: 100 }),
  body('description').trim().optional(),
  body('startDate').optional().isISO8601(),
  body('dueDate').optional().isISO8601()
];

const idValidation = [
  param('id').isNumeric()
];

// Type assertion function
const handleAuth = <P extends Record<string, any> = {}, ResBody = any, ReqBody = any>(
  handler: (req: AuthRequest<P>, res: Response) => Promise<void>
): RequestHandler<P, ResBody, ReqBody> => {
  return handler as RequestHandler<P, ResBody, ReqBody>;
};

// Apply auth middleware
router.use(authMiddleware as RequestHandler);

// Routes with proper type handling
router.post('/', 
  validate(projectValidation),
  handleAuth(createProject)
);

router.get('/',
  handleAuth(getProjects)
);

router.get('/:id',
  validate(idValidation),
  handleAuth<{id: string}>(getProjectById)
);

router.put('/:id',
  validate([...idValidation, ...projectValidation]),
  handleAuth<{id: string}>(updateProject)
);

router.delete('/:id',
  validate(idValidation),
  handleAuth<{id: string}>(deleteProject)
);

export default router;
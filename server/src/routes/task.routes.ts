import express, { Router, Response, RequestHandler } from 'express';
import { body } from 'express-validator';
import { 
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask 
} from '../controllers/task.controller';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';

const router: Router = express.Router();

const taskValidation = [
  body('title').trim().isLength({ min: 1, max: 100 }),
  body('description').trim().optional(),
  body('projectId').isInt(),
  body('priority').isIn(['low', 'medium', 'high']),
  body('startDate').optional().isISO8601(),
  body('dueDate').optional().isISO8601(),
  body('estimatedHours').optional().isFloat({ min: 0 }),
  body('assigneeId').optional().isInt()
];

const statusValidation = [
  body('status').isIn(['todo', 'in-progress', 'review', 'done'])
];

// Type assertion function
const handleAuth = <P extends Record<string, any> = {}, ResBody = any, ReqBody = any>(
  handler: (req: AuthRequest<P>, res: Response) => Promise<void>
): RequestHandler<P, ResBody, ReqBody> => {
  return handler as RequestHandler<P, ResBody, ReqBody>;
};

// Apply auth middleware
router.use(authMiddleware as RequestHandler);

// Routes
router.post('/', 
  validate(taskValidation),
  handleAuth(createTask)
);

router.get('/',
  handleAuth(getTasks)
);

router.get('/:id',
  handleAuth<{id: string}>(getTaskById)
);

router.put('/:id',
  validate(taskValidation),
  handleAuth<{id: string}>(updateTask)
);

router.patch('/:id/status',
  validate(statusValidation),
  handleAuth<{id: string}>(updateTaskStatus)
);

router.delete('/:id',
  handleAuth<{id: string}>(deleteTask)
);

export default router;
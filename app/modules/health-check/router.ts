import { getStatus } from './controller';
import { Router } from 'express';

export const healthCheckRouter = Router({ mergeParams: true });

healthCheckRouter.get('/', getStatus);

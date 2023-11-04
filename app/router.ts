import { Express } from 'express';
import { healthCheckRouter } from './modules';

export default function (app: Express) {
  app.use('/health-check', healthCheckRouter);

  app.use((_, res) => {
    res.status(404).json({ error: 'Not Found' });
  });
}

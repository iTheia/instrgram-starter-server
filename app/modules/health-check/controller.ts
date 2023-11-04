import { Request, Response } from 'express';

export function getStatus(_: Request, res: Response) {
  res.send({
    status: 200,
    message: 'Server up!',
  });
}

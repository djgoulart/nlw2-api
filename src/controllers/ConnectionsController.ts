import { Request, Response } from 'express';
import db from '../database/connection';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ConnectionsController {
  async index(request: Request, response: Response): Promise<Response> {
    const totalConnections = await db('connections').count('* as total');

    return response.json(totalConnections[0]);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;

    const trx = await db.transaction();

    try {
      await trx('connections').insert({
        user_id,
      });

      await trx.commit();

      return response.status(201).send();
    } catch (error) {
      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while creating new connection',
      });
    }
  }
}

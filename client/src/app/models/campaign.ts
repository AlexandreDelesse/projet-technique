import { File } from './file';
import { User } from './user';

export class Campaign {
  constructor(
    public title: string,
    public description: string,
    public start_date: Date,
    public end_date: Date,
    public start_time: string,
    public end_time: string,
    public slot_duration: number,
    public created_at: string | null,
    public adress: any,
    public file: File,
    public users: User[],
    public slug?: string,
    public updated_at?: Date,
    public id?: number,
    public pivot?: any
  ) {}
}

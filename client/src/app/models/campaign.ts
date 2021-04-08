import { File } from './file';

export class Campaign {
  constructor(
    public title: string,
    public description: string,
    public start_at: Date,
    public end_at: Date,
    public capacity: number,
    public created_at: string | null,
    public adress: any,
    public file: File,
    public slug?: string,
    public updated_at?: Date,
    public id?: number
  ) {}
}

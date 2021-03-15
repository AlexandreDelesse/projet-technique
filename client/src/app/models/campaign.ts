export class Campaign {
  constructor(
    public title: string,
    public description: string,
    public location: string,
    public start_at: Date,
    public end_at: Date,
    public capacity: number,
    public created_at: string | null,
    public slug?: string,
    public updated_at?: Date,
    public id?: number
  ) {}
}

export class Campaign {

  constructor(
              public title: string,
              public description: string,
              public location: string,
              public startAt: Date,
              public endAt: Date,
              public capacity: number,
              public createdAt: string | null,
              public slug?: string,
              public updatedAt?: Date,
              public id?: number) {
  }
}

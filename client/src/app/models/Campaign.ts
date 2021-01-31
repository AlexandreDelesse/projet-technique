export class Campaign {
  constructor(public id: number,
              public title: string,
              public slug: string,
              public description: string,
              public location: string,
              public startAt: Date,
              public endAt: Date,
              public capacity: number,
              public createdAt: Date,
              public updatedAt: Date) {
  }
}

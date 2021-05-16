import { Campaign } from './campaign';

export class User {
  firstname!: string;
  lastname!: string;
  email!: string;
  type!: number;
  updated_at!: Date;
  created_at!: Date;
  campaigns!: Campaign[];
  google_calendar_api_activated!: boolean;
  receive_emails!: boolean;
  avatar?: string;
  phone?: string;
  gender?: string;
  slug?: string;
  adress_id: any;
  adress?: any;
  bloodgroup_id?: number;
  id?: number;
  birthdate?: Date;
  pivot?: any;
  bloodgroup?: any;

  getFullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  static getUserFromLocalStorage(): any {
    let userStr = localStorage.getItem('user');
    let user = new User();
    if (userStr) {
      Object.assign(user, JSON.parse(userStr));
      return user;
    }
    return null;
  }
}

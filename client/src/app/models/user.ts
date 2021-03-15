export class User {
  firstname!: string;
  lastname!: string;
  email!: string;
  type!: number;
  updated_at!: Date;
  created_at!: Date;
  avatar?: string;
  phone?: string;
  gender?: string;
  slug?: string;
  adress?: string;
  bloodgroup_id?: number;
  id?: number;
  birthdate?: Date;

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

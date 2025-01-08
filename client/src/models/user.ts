export class User {
  userName: string;
  email: string;
  password: string;
  userMunicipality: number | null;

  constructor(
    userName: string,
    email: string,
    password: string,
    userMunicipality: number | null
  ) {
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.userMunicipality = userMunicipality;
  }
}

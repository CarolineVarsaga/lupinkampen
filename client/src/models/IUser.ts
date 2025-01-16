export interface IUser {
  userId: number;
  userName: string;
  email: string;
  password: string;
  userMunicipality: number;
  userAssociation?: number;
  associationPickedLupins?: number;
  recentlyPickedLupins: number;
  totalPickedLupins: number;
  avatar: string;
  medals: string;
  userDeleted: number;
}

export interface IUserWithPlacement extends IUser {
  userPlacement: number;
}

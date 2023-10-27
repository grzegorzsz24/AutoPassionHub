interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  dateOfBirth: string;
  password: string;
  publicProfile: boolean;
}

export default UserModel;

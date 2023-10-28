interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  dateOfBirth: string;
  password: string;
  publicProfile: boolean;
  imageUrl: string;
}

export default UserModel;

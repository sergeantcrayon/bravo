import { User } from '.';

export interface Comment {
  _id: string;
  text: string;
  created: Date;
  createdBy: User;
}

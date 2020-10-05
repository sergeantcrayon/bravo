import { Game, User } from '@shared/models';
import { GoogleLoginResponse } from 'react-google-login';

export interface CoreState {
  google: GoogleLoginResponse;
  user: User;
  jwt: string;
  games: Game[];
  signupModal: boolean;
}

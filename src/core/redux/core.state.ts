import { Game, User } from '@shared/models';
import { GoogleLoginResponse } from 'react-google-login';

export interface CoreState {
  google: GoogleLoginResponse;
  user: User;
  games: Game[];
  signupModal: boolean;
}

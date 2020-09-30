import { GoogleLoginResponse } from 'react-google-login';
import { User } from '../../shared/models/user';
import { Game } from './../../shared/models/game';

export interface CoreState {
  google: GoogleLoginResponse;
  user: User;
  games: Game[];
  signupModal: boolean;
}

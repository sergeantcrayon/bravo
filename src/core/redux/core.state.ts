import { GoogleLoginResponse } from 'react-google-login';
import { Game } from './../../shared/models/game';

export interface CoreState {
  google: GoogleLoginResponse;
  games: Game[];
}

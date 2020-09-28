import { Game, GameMode, Platform, Region } from './game';
import { User } from './user';

export interface Lfg {
  _id: string;
  user: User;
  game: Game;
  gameModes: GameMode[];
  platform: Platform;
  region: Region;
  ign: string;
  tags: string[];
  description: string;
  playerCount: number;
  created: Date;
}

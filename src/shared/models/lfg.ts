import { Game, GameMode, Platform, Region } from './game';
import { LfgUser, User } from './user';

export interface Lfg {
  _id: string;
  owner: User;
  users: LfgUser[];
  game: Game;
  gameModes: GameMode[];
  platform: Platform;
  region: Region;
  ign: string;
  tags: string[];
  description: string;
  maxPlayers: number;
  created: Date;
}

import { Game } from './game';

export interface Lfg extends LfgBase {
  _id: string;
  user: {
    name: string;
    googleId: string;
    image: string;
  };
}

export interface LfgBase {
  game: Game;
  gameModes: string[];
  platform: string;
  region: string;
  ign: string;
  tags: string[];
  description: string;
  playerCount: number;
}

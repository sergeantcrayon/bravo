export interface Game {
  _id: string;
  name: string;
  alias?: string;
  platforms: Platform[];
  gameModes: GameMode[];
  regions: Region[];
}

export interface Platform {
  _id: string;
  name: string;
}

export interface GameMode {
  _id: string;
  name: string;
}

export interface Region {
  _id: string;
  name: string;
}

export interface Game {
  _id: string;
  name: string;
  alias?: string;
  platforms: Platform[];
  gameModes: GameMode[];
  regions: Region[];
}

export interface Platform {
  name: string;
}

export interface GameMode {
  name: string;
}

export interface Region {
  name: string;
}

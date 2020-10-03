export interface User {
  _id: string;
  name: string;
  googleId: string;
  image: string;
}

export interface LfgUser extends User {
  ign: string;
}

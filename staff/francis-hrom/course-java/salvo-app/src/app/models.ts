export interface Square {
  value: string;
  type: SquareType;
  location: string;
}

export enum SquareType {
  Water = 'water',
  Header = 'header',
  Ship = 'ship',
  HitShip = 'hitShip',
  HitWater = 'hitWater',
  Empty = '',
}

export interface AuthPlayerGames {
  authPlayer: Player;
  games: Game[];
}

export interface Game {
  id: number;
  created: string;
  gamePlayers: GamePlayer[];
}

export interface GamePlayer {
  id: number;
  player: Player;
}

export interface Player {
  id: number;
  email: string;
}

export interface Ship {
  id: number;
  type: ShipType;
  locations: string[];
}

export enum ShipType {
  Carrier,
  Battleship,
  Submarine,
  Destroyer,
  PatrolBoat,
}

export interface Salvo {
  turn: number;
  locations: string[];
}

export interface GameView {
  id: number;
  game: Game;
  player: Player;
  opponent: Player;
  joinDate: string;
  gamePlayers: GamePlayer[];
  ships: Ship[];
  salvoesPlayer: Salvo[];
  salvoesOpponent: Salvo[];
}

export interface PlayerScore {
  id: number;
  email: string;
  won: number;
  lost: number;
  tied: number;
}

export interface CommonResponse {
  ErrorCode: number;
  message: String;
  data: Object;
}
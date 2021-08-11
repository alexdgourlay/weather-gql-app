export interface Coord {
  readonly lon: number;
  readonly lat: number;
}

export default interface Location {
  readonly id: number;
  readonly name: string;
  readonly state: string;
  readonly country: string;
  readonly coord: Coord;
}

export default interface FencerSummary {
  universityId: string;
  firstName?: string;
  lastName: string;
  weapon: Weapon;
  team: Team;
  record: {
    wins: number;
    losses: number;
  };
  rating: number;
  fullName: string;
}

export enum Weapon {
  FOIL,
  EPEE,
  SABER,
}

export enum Team {
  MEN,
  WOMEN,
}

export class FencerSummary1 implements FencerSummary {
  public record;
  constructor(
    public firstName: string,
    public lastName: string,
    public universityId: string,
    public weapon: Weapon,
    public team: Team,
    wins: number,
    losses: number,
    private ratingFn: (fencer: FencerSummary) => number,
  ) {
    this.record = {
      wins: wins,
      losses: losses,
    };
  }
  get rating(): number {
    return this.ratingFn(this);
  }
  get fullName() {
    return this.firstName
      ? this.firstName + " " + this.lastName
      : this.lastName;
  }
}

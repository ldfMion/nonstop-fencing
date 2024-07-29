import { Team, Weapon } from "~/models/FencerSummary";
import getValuesfromCsv from "./getValuesFromCsv";

export default async function getFencersFromTeamAndWeapon(
  team: string,
  weapon: string,
) {
  const parsedTeam = parseTeam(team);
  const parsedWeapon = parseWeapon(weapon);
  const data = await getValuesfromCsv();
  return data.filter(
    (fencer) => fencer.weapon === parsedWeapon && fencer.team === parsedTeam,
  );
}

function parseTeam(team: string): Team {
  if (team === "womens") {
    return Team.WOMEN;
  }
  if (team === "mens") {
    return Team.MEN;
  }
  throw new Error("Invalid team identifier " + team);
}

function parseWeapon(weapon: string): Weapon {
  switch (weapon) {
    case "saber":
      return Weapon.SABER;
    case "foil":
      return Weapon.FOIL;
    case "epee":
      return Weapon.EPEE;
    default:
      throw new Error("Invalid team identifier " + weapon);
  }
}

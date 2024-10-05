import {Team} from './FencerSummary';

export interface Match2 {
    id: string;
    teamAId: string;
    teamBId: string;
    overallA: number;
    overallB: number;
    foilA: number;
    foilB: number;
    epeeA: number;
    epeeB: number;
    saberA: number;
    saberB: number;
    hostId: string;
    meetId: string;
    gender: Team;
}

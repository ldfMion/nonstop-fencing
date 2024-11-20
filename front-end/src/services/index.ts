import 'server-only';
import {FencerService} from './FencerService';
import {BoutService} from './boutService';
import {RecordService} from './recordService';
import {UniversityService} from './universityService';
import {MatchService} from './MatchService';

export const fencerService = new FencerService();
export const boutService = new BoutService();
export const recordService = new RecordService();
export const matchService = new MatchService();
export const universityService = new UniversityService();

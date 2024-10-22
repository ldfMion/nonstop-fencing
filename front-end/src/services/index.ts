import {boutRepository, fencerRepository, matchRepository, universityRepository} from '~/repositories';
import {FencerService} from './FencerService';
import {BoutService} from './boutService';
import {RecordService} from './recordService';
import {UniversityService} from './universityService';
import {MatchService} from './MatchService';

export const fencerService = new FencerService();
export const boutService = new BoutService(fencerRepository, matchRepository, boutRepository);
export const recordService = new RecordService();
export const matchService = new MatchService(matchRepository);
export const universityService = new UniversityService(universityRepository, matchRepository, recordService, matchService);

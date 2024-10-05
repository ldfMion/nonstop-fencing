import {boutRepository, fencerRepository, matchRepository} from '~/repositories';
import {FencerService} from './FencerService';

export const fencerService = new FencerService(fencerRepository, matchRepository, boutRepository);

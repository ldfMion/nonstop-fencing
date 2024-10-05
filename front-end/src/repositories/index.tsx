import {BoutRepository} from './BoutRepository';
import {CSVBoutRepository} from './CSVBoutRepository';
import {CSVFencerRepository} from './CSVFencerRepository';
import {CSVMatchRepository} from './CSVMatchRepository';
import {FencerRepository} from './FencerRepository';
import {MatchRepository} from './MatchRepository';

const MATCHES_FILENAME = '../data/osu_duals_matches.csv';
const BOUTS_FILENAME = '../data/osu_duals_bouts.csv';
const FENCERS_FILENAME = '../data/fencers_24_25.csv';

export const matchRepository = new CSVMatchRepository(MATCHES_FILENAME) as MatchRepository;
export const boutRepository = new CSVBoutRepository(BOUTS_FILENAME) as BoutRepository;
export const fencerRepository = new CSVFencerRepository(FENCERS_FILENAME) as FencerRepository;

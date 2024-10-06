import {BoutRepository} from './BoutRepository';
import {CSVBoutRepository} from './CSVBoutRepository';
import {CSVEventRepository} from './CSVEventRepository';
import {CSVFencerRepository} from './CSVFencerRepository';
import {CSVMatchRepository} from './CSVMatchRepository';
import {CSVUniversityRepository} from './CSVUniversityRepository';
import {EventRepository} from './EventRepository';
import {FencerRepository} from './FencerRepository';
import {MatchRepository} from './MatchRepository';
import {UniversityRepository} from './UniversityRepository';

const MATCHES_FILENAME = '../data/osu_duals_matches.csv';
const BOUTS_FILENAME = '../data/osu_duals_bouts.csv';
const FENCERS_FILENAME = '../data/fencers_24_25.csv';
const UNIVERSITIES_FILENAME = '../data/universities.csv';
const EVENTS_FILENAME = '../data/meets_24_25.csv';

export const matchRepository = new CSVMatchRepository(MATCHES_FILENAME) as MatchRepository;
export const boutRepository = new CSVBoutRepository(BOUTS_FILENAME) as BoutRepository;
export const fencerRepository = new CSVFencerRepository(FENCERS_FILENAME) as FencerRepository;
export const universityRepository = new CSVUniversityRepository(UNIVERSITIES_FILENAME) as UniversityRepository;
export const eventRepository = new CSVEventRepository(EVENTS_FILENAME) as EventRepository;

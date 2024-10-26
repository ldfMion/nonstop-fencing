import type {University2} from '~/models/University2';
import type {BoutRepository} from './BoutRepository';
import {CSVBoutRepository} from './CSVBoutRepository';
import {CSVEventRepository} from './CSVEventRepository';
import {CSVFencerRepository} from './CSVFencerRepository';
import {CSVMatchRepository} from './CSVMatchRepository';
import {CSVUniversityRepository} from './CSVUniversityRepository';
import type {EventRepository} from './EventRepository';
import type {FencerRepository} from './FencerRepository';
import type {MatchRepository} from './MatchRepository';
import type {Repository} from './Repository';

const MATCHES_FILENAME_2025 = '../data/osu_duals_matches.csv';
const MATCHES_FILENAME_2024_MEN = '../data/team-results-men.csv';
const MATCHES_FILENAME_2024_WOMEN = '../data/team-results-women.csv';
const BOUTS_FILENAME = '../data/osu_duals_bouts.csv';
const FENCERS_FILENAME_2025 = '../data/fencers_24_25.csv';
const FENCERS_FILENAME_2024 = '../data/fencers_23_24.csv';
const UNIVERSITIES_FILENAME = '../data/universities.csv';
const EVENTS_FILENAME = '../data/meets_24_25.csv';

export const matchRepository = new CSVMatchRepository(
    MATCHES_FILENAME_2025,
    MATCHES_FILENAME_2024_MEN,
    MATCHES_FILENAME_2024_WOMEN,
) as MatchRepository;
export const boutRepository = new CSVBoutRepository(BOUTS_FILENAME) as BoutRepository;
export const fencerRepository = new CSVFencerRepository(FENCERS_FILENAME_2024, FENCERS_FILENAME_2025) as FencerRepository;
export const universityRepository = new CSVUniversityRepository(UNIVERSITIES_FILENAME) as Repository<University2>;
export const eventRepository = new CSVEventRepository(EVENTS_FILENAME) as EventRepository;

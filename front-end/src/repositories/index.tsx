import 'server-only';
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
import {getFilesInDirectory} from '~/helpers/getFilesInDirectory';

const BOUTS_FOLDER = '../data/bouts';
const MATCHES_FOLDER = '../data/matches';
const FENCERS_FILENAME_2025 = '../data/fencers_24_25.csv';
const FENCERS_FILENAME_2024 = '../data/fencers_23_24.csv';
const UNIVERSITIES_FILENAME = '../data/universities.csv';
const EVENTS_FILENAME = '../data/meets_24_25.csv';

const boutsFiles = await getFromDirectoryAndMapFilenames(BOUTS_FOLDER);
const matchesFiles = await getFromDirectoryAndMapFilenames(MATCHES_FOLDER);

export const matchRepository = new CSVMatchRepository(...matchesFiles) as MatchRepository;
export const boutRepository = new CSVBoutRepository(...boutsFiles) as BoutRepository;
export const fencerRepository = new CSVFencerRepository(FENCERS_FILENAME_2024, FENCERS_FILENAME_2025) as FencerRepository;
export const universityRepository = new CSVUniversityRepository(UNIVERSITIES_FILENAME) as Repository<University2>;
export const eventRepository = new CSVEventRepository(EVENTS_FILENAME) as EventRepository;

async function getFromDirectoryAndMapFilenames(directory: string): Promise<string[]> {
    const files: string[] = await getFilesInDirectory(directory);
    const paths = files.map((filename) => `../data/${directory.split('/').pop()}/${filename}`);
    return paths;
}

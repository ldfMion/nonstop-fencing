import {readdir} from 'fs/promises';

export async function getFilesInDirectory(directory: string): Promise<string[]> {
    const files = await readdir(directory);
    // Return the array of filenames
    return files;
}

import files from './filedata.json';
import type { FileData } from './filedata';

const GetRandomTimeoutValue = () => (200 * Math.random() * 5)

/**
 * Simulate request time by using timeout before Promise resolution.
 */
export const GetData : Promise<FileData> = new Promise((resolve) => {
    setTimeout(() => {
        resolve(files)
    }, GetRandomTimeoutValue());
});
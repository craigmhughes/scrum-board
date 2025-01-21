import {test, expect} from 'vitest';
import { GetData } from '.';

test('check number of files equal 5', async () => {
    const data = await GetData;
    expect(data.length).toBe(5);
})
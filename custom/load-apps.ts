import type { RawApp } from '@gkd-kit/api';
import { batchImportApps } from '@gkd-kit/tools';
import fs from 'node:fs/promises';

export const loadCustomApps = async (appDir: string): Promise<RawApp[]> => {
  try {
    const files = await fs.readdir(appDir);
    if (files.length === 0) return [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw error;
  }
  return batchImportApps(appDir);
};

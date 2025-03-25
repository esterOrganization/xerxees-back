import { Logger } from '@nestjs/common';
import { resolve } from 'path';

/**
 * Get the path to the environment file based on the 'APP_MODE' environment variable.
 * @returns The resolved path to the environment file.
 */
export function getEnvPath(): string {
  const env: string | undefined = process.env.NODE_ENV;
  const filename: string = env ? `.env.${env}` : `.env.development`;
  Logger.warn(`Server is running on ${env}`, 'Running Server');
  return resolve(filename);
}

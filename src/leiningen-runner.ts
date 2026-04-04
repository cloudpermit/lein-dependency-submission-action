import * as exec from '@actions/exec';
import * as core from '@actions/core';
import * as path from 'path';
import { fileExists } from './utils/file-utils';

export type ExecResults = {
  stdout: string,
  stderr: string,
  exitCode: number
}

export class LeiningenRunner {
  private leinExecutable: string;

  constructor(directory?: string) {
    this.leinExecutable = resolveLeiningenExecutable(directory);
  }

  get executable(): string {
    return this.leinExecutable;
  }

  async exec(cwd: string, parameters: string[]): Promise<ExecResults> {
    let executionOutput = '';
    let executionErrors = '';

    const options = {
      cwd: cwd,
      listeners: {
        stdout: (data: Buffer) => {
          executionOutput += data.toString();
        },
        stderr: (data: Buffer) => {
          executionErrors += data.toString();
        }
      }
    };

    try {
      const exitCode = await exec.exec(this.leinExecutable, parameters, options);

      return {
        stdout: executionOutput,
        stderr: executionErrors,
        exitCode: exitCode
      }
    } catch (err: any) {
      core.warning(`Error encountered executing leiningen: ${err.message}`);
      return {
        stdout: executionOutput,
        stderr: executionErrors,
        exitCode: -1
      }
    }
  }

  /**
   * Generate a pom.xml file using `lein pom`
   * @param directory The directory containing project.clj
   * @returns The path to the generated pom.xml
   */
  async generatePom(directory: string): Promise<string> {
    core.info('Generating pom.xml from project.clj using lein pom...');

    const result = await this.exec(directory, ['pom']);

    if (result.exitCode !== 0) {
      throw new Error(`Failed to generate pom.xml with lein pom, exit code: ${result.exitCode}\nStderr: ${result.stderr}`);
    }

    const pomPath = path.join(directory, 'pom.xml');
    if (!fileExists(pomPath)) {
      throw new Error(`pom.xml was not generated at expected location: ${pomPath}`);
    }

    core.info(`Successfully generated pom.xml at ${pomPath}`);
    return pomPath;
  }
}

/**
 * Check if a directory contains a Leiningen project (project.clj file)
 */
export function isLeiningenProject(directory: string): boolean {
  const projectClj = path.join(directory, 'project.clj');
  return fileExists(projectClj);
}

/**
 * Resolve the Leiningen executable to use
 */
function resolveLeiningenExecutable(directory?: string): string {
  // Check for lein wrapper in the project directory first
  if (directory) {
    const wrapper = getLeiningenWrapper(directory);
    if (wrapper) {
      return wrapper;
    }
  }

  // Fall back to lein on PATH
  return getLeiningenExecutable();
}

/**
 * Check for lein wrapper script in the project directory
 */
function getLeiningenWrapper(directory: string): string | undefined {
  const leinWrapperFilename = path.join(directory, getLeiningenWrapperExecutable());
  if (fileExists(leinWrapperFilename)) {
    return leinWrapperFilename;
  }
  return undefined;
}

function getLeiningenWrapperExecutable(): string {
  if (isWindows()) {
    return 'lein.bat';
  }
  return 'lein';
}

function getLeiningenExecutable(): string {
  if (isWindows()) {
    return 'lein.bat';
  }
  return 'lein';
}

function isWindows() {
  return process.platform === 'win32';
}


import * as path from 'path';
import { LeiningenRunner, isLeiningenProject } from './leiningen-runner';
import { describe, it, expect } from 'vitest';

describe('leiningen-runner', () => {

  describe('isLeiningenProject', () => {

    it('should return false for non-existent directory', () => {
      const result = isLeiningenProject('/nonexistent/path');
      expect(result).toBe(false);
    });

    it('should return false for directory without project.clj', () => {
      const projectDir = path.join(__dirname, '../test-data/maven/simple');
      const result = isLeiningenProject(projectDir);
      expect(result).toBe(false);
    });

  });

  describe('create', () => {

    it('should create a runner', () => {
      const runner = new LeiningenRunner();

      expect(runner.executable).toBeDefined();
      expect(runner.executable).toMatch(/lein/);
    });

  });

});


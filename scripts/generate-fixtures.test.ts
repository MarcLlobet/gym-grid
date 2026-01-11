import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import {
  createMemberIds,
  createDateOffsets,
  createRange,
  createAttempt,
  generateAttempts,
  writeFixtures,
  main,
} from './generate-fixtures';

describe('createMemberIds', () => {
  it('creates the specified number of member IDs', () => {
    const members = createMemberIds(3);
    expect(members).toHaveLength(3);
  });

  it('creates unique member IDs', () => {
    const members = createMemberIds(5);
    const uniqueMembers = new Set(members);
    expect(uniqueMembers.size).toBe(5);
  });

  it('creates IDs with member- prefix', () => {
    const members = createMemberIds(2);
    members.forEach(member => {
      expect(member).toMatch(/^member-/);
    });
  });

  it('returns empty array for count 0', () => {
    const members = createMemberIds(0);
    expect(members).toEqual([]);
  });
});

describe('createDateOffsets', () => {
  const baseDate = new Date('2025-01-15T12:00:00.000Z');

  it('creates dates offset by specified days', () => {
    const dates = createDateOffsets([1, 7, 30], baseDate);

    expect(dates).toHaveLength(3);
    expect(dates[0]).toEqual(new Date('2025-01-14T12:00:00.000Z'));
    expect(dates[1]).toEqual(new Date('2025-01-08T12:00:00.000Z'));
    expect(dates[2]).toEqual(new Date('2024-12-16T12:00:00.000Z'));
  });

  it('returns empty array for empty input', () => {
    const dates = createDateOffsets([], baseDate);
    expect(dates).toEqual([]);
  });

  it('handles zero offset', () => {
    const dates = createDateOffsets([0], baseDate);
    expect(dates[0]).toEqual(baseDate);
  });
});

describe('createRange', () => {
  it('creates array from 1 to count', () => {
    expect(createRange(5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns empty array for count 0', () => {
    expect(createRange(0)).toEqual([]);
  });

  it('handles count of 1', () => {
    expect(createRange(1)).toEqual([1]);
  });
});

describe('createAttempt', () => {
  const date = new Date('2025-01-15T12:00:00.000Z');

  it('creates an attempt with all properties', () => {
    const attempt = createAttempt('member-123', 5, 7, date, 0.8);

    expect(attempt).toEqual({
      memberUuid: 'member-123',
      exerciseId: 5,
      weightId: 7,
      executedAt: { date: '2025-01-15T12:00:00.000Z' },
      passed: true,
    });
  });

  it('sets passed to true when randomValue > 0.5', () => {
    const attempt = createAttempt('member-123', 1, 1, date, 0.6);
    expect(attempt.passed).toBe(true);
  });

  it('sets passed to false when randomValue <= 0.5', () => {
    const attempt = createAttempt('member-123', 1, 1, date, 0.5);
    expect(attempt.passed).toBe(false);
  });

  it('sets passed to false when randomValue is 0', () => {
    const attempt = createAttempt('member-123', 1, 1, date, 0);
    expect(attempt.passed).toBe(false);
  });
});

describe('generateAttempts', () => {
  it('generates correct number of attempts', () => {
    const config = {
      memberCount: 2,
      exerciseCount: 3,
      weightCount: 4,
      datePeriods: [1, 2],
    };

    const attempts = generateAttempts(config);

    // 2 members * 3 exercises * 4 weights * 2 dates = 48
    expect(attempts).toHaveLength(48);
  });

  it('assigns sequential IDs starting from 1', () => {
    const config = {
      memberCount: 1,
      exerciseCount: 2,
      weightCount: 2,
      datePeriods: [1],
    };

    const attempts = generateAttempts(config);

    expect(attempts.map(r => r.id)).toEqual([1, 2, 3, 4]);
  });

  it('uses provided random function for deterministic results', () => {
    const config = {
      memberCount: 1,
      exerciseCount: 1,
      weightCount: 1,
      datePeriods: [1],
    };

    const alwaysPass = generateAttempts(config, () => 0.9);
    const alwaysFail = generateAttempts(config, () => 0.1);

    expect(alwaysPass[0].passed).toBe(true);
    expect(alwaysFail[0].passed).toBe(false);
  });

  it('generates attempts with all exercise and weight combinations', () => {
    const config = {
      memberCount: 1,
      exerciseCount: 2,
      weightCount: 2,
      datePeriods: [1],
    };

    const attempts = generateAttempts(config);
    const combinations = attempts.map(r => `${r.exerciseId}-${r.weightId}`);

    expect(combinations).toContain('1-1');
    expect(combinations).toContain('1-2');
    expect(combinations).toContain('2-1');
    expect(combinations).toContain('2-2');
  });

  it('uses default config when none provided', () => {
    const attempts = generateAttempts();

    // 5 members * 12 exercises * 12 weights * 3 dates = 2160
    expect(attempts).toHaveLength(2160);
  });
});

describe('writeFixtures', () => {
  const testOutputPath = join(__dirname, 'test-output.json');

  afterEach(() => {
    if (existsSync(testOutputPath)) {
      unlinkSync(testOutputPath);
    }
  });

  it('writes attempts to file as JSON', () => {
    const attempts = [
      {
        id: 1,
        memberUuid: 'member-1',
        exerciseId: 1,
        weightId: 1,
        executedAt: { date: '2025-01-15T12:00:00.000Z' },
        passed: true,
      },
    ];

    writeFixtures(attempts, testOutputPath);

    expect(existsSync(testOutputPath)).toBe(true);
  });
});

describe('main', () => {
  const testOutputPath = join(__dirname, 'test-main-output.json');

  beforeEach(() => {
    if (existsSync(testOutputPath)) {
      unlinkSync(testOutputPath);
    }
  });

  afterEach(() => {
    if (existsSync(testOutputPath)) {
      unlinkSync(testOutputPath);
    }
  });

  it('generates fixtures when file does not exist', () => {
    main(testOutputPath);

    expect(existsSync(testOutputPath)).toBe(true);
  });

  it('skips generation when file exists and force is false', () => {
    writeFileSync(testOutputPath, '[]');
    const originalContent = '[]';

    main(testOutputPath, false);

    const content = require('fs').readFileSync(testOutputPath, 'utf-8');
    expect(content).toBe(originalContent);
  });

  it('regenerates fixtures when force is true', () => {
    writeFileSync(testOutputPath, '[]');

    main(testOutputPath, true);

    const content = require('fs').readFileSync(testOutputPath, 'utf-8');
    expect(content).not.toBe('[]');
    expect(JSON.parse(content)).toHaveLength(2160);
  });
});

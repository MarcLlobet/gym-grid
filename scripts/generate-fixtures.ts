import { randomUUID } from 'crypto';
import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import type { Attempt } from '../src/components/gym-dashboard';

const __dirname = dirname(fileURLToPath(import.meta.url));

type AttemptWithoutId = Omit<Attempt, 'id'>;

type GeneratorConfig = {
  memberCount: number;
  exerciseCount: number;
  weightCount: number;
  datePeriods: number[];
};

const DEFAULT_CONFIG: GeneratorConfig = {
  memberCount: 5,
  exerciseCount: 12,
  weightCount: 12,
  datePeriods: [2, 14, 35], // days ago
};

export const createMemberIds = (count: number): string[] =>
  Array.from({ length: count }, () => `member-${randomUUID()}`);

export const createDateOffsets = (daysAgoList: number[], baseDate: Date = new Date()): Date[] =>
  daysAgoList.map(days => new Date(baseDate.getTime() - days * 24 * 60 * 60 * 1000));

export const createRange = (count: number): number[] =>
  Array.from({ length: count }, (_, i) => i + 1);

export const createAttempt = (
  memberUuid: string,
  exerciseId: number,
  weightId: number,
  date: Date,
  randomValue: number = Math.random()
): AttemptWithoutId => ({
  memberUuid,
  exerciseId,
  weightId,
  executedAt: { date: date.toISOString() },
  passed: randomValue > 0.5,
});

export const generateAttempts = (
  config: GeneratorConfig = DEFAULT_CONFIG,
  randomFn: () => number = Math.random
): Attempt[] => {
  const members = createMemberIds(config.memberCount);
  const dates = createDateOffsets(config.datePeriods);
  const exercises = createRange(config.exerciseCount);
  const weights = createRange(config.weightCount);

  const attemptsWithoutId = members.flatMap(memberUuid =>
    exercises.flatMap(exerciseId =>
      weights.flatMap(weightId =>
        dates.map(date => createAttempt(memberUuid, exerciseId, weightId, date, randomFn()))
      )
    )
  );

  return attemptsWithoutId.map((attempt, index) => ({
    id: index + 1,
    ...attempt,
  }));
};

export const writeFixtures = (attempts: Attempt[], outputPath: string): void => {
  writeFileSync(outputPath, JSON.stringify(attempts, null, 2));
};

export const main = (outputPath: string, force: boolean = false): void => {
  if (!force && existsSync(outputPath)) {
    console.log(`Fixtures already exist at ${outputPath}, skipping generation.`);
    return;
  }

  const attempts = generateAttempts();
  writeFixtures(attempts, outputPath);
  console.log(`Generated ${attempts.length} attempts in ${outputPath}`);
};

// Run if executed directly
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  const outputPath = join(__dirname, '../public/attempts.json');
  const force = process.argv.includes('--force');
  main(outputPath, force);
}

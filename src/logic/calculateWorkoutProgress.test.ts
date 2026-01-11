import type { Attempt } from "../components/gym-dashboard";
import { calculateWorkoutProgress } from "./calculateWorkoutProgress";
import {describe, it, expect } from 'vitest';

describe('calculateWorkoutProgress', () => {

  it('returns if members have failing attempts', () => {
    const caseAttempt = {
      memberUuid: 'member1',
      exerciseId: 2,
      weightId: 3,
      executedAt: {
        date: new Date(2000, 1, 1, 13).toDateString()
      }
    }

    const attempts: Attempt[] = [
      { id: 0, ...caseAttempt, memberUuid: 'member2', passed: false},
      { id: 1, ...caseAttempt, passed: false },
      { id: 2, ...caseAttempt, passed: true },
      { id: 3, ...caseAttempt, passed: false,
        executedAt: {
          date: new Date(2000, 1, 1, 14).toDateString()
        }
      },
    ];

    const summaries = calculateWorkoutProgress(attempts);

    const exerciseSummary = summaries.find(s => s.exerciseId === 2);
    const weightSummary = exerciseSummary?.weights.find(s => s.weightId === 3);

    expect(weightSummary).toEqual({
      isAttempted: false,
      isMostlyFailing: true,
      key: "2x3",
      weightId: 3,
    });
  });

  it('returns table with not attempted state', () => {

    const attempts: Attempt[] = [
    ];

    const summaries = calculateWorkoutProgress(attempts);

    const exerciseSummary = summaries.find(s => s.exerciseId === 2);
    const weightSummary = exerciseSummary?.weights.find(s => s.weightId === 3);

    expect(weightSummary).toEqual({
      isAttempted: false,
      isMostlyFailing: false,
      key: "2x3",
      weightId: 3,
    });
  });

  it('returns exercise data', () => {

    const attempts: Attempt[] = [
    ];

    const summaries = calculateWorkoutProgress(attempts);

    const exerciseSummary = summaries.find(s => s.exerciseId === 2);

    expect(exerciseSummary).toEqual({
      exerciseId: 2,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      weights: expect.any(Array),
    });
  });
});

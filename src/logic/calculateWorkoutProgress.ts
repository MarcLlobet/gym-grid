import type { Attempt } from "../components/gym-dashboard";
import { MAX_DIMENSION } from "../constants";

export type WeightSummary = {
  key: string;
  weightId: number;
  isAttempted: boolean;
  isMostlyFailing: boolean;
}

type ExerciseSummary = {
    exerciseId: number;
    weights: WeightSummary[]
};

const getAttemptsByExerciseAndWeight = (attempts: Attempt[]): Map<
  number,
  Map<number, Attempt[]>
> => {
  const attemptsByExercise = Map.groupBy(
    attempts,
    ({ exerciseId }) => exerciseId
  );

  const attemptsByExerciseAndWeight = Array.from(attemptsByExercise.entries())
    .reduce((prev, [exerciseId, exerciseAttempts]) =>
      new Map([
        ...prev.entries(),
        [
          exerciseId,
          Map.groupBy(
            exerciseAttempts,
            ({ weightId }) => weightId
          )
        ]
      ]),
    new Map<number, Map<number, Attempt[]>>()
  );

  return attemptsByExerciseAndWeight;
}

export const calculateWorkoutProgress = (attempts: Attempt[]): ExerciseSummary[] => {
  const attemptsByExerciseAndWeight = getAttemptsByExerciseAndWeight(attempts);

  const failingLastAttempts = Array.from(attemptsByExerciseAndWeight.entries())
  .reduce((prevExercise, [exerciseId, attemptsByExercise]) => new Map([
      ...prevExercise.entries(),
      [
        exerciseId,
        Array.from(attemptsByExercise.entries())
        .reduce((prevWeight, [weightId, attemptsByWeight]) => {
          const attemptsByMember = Object.groupBy(attemptsByWeight, ({ memberUuid }) => memberUuid) as Record<string, Attempt[]>;

          const memberAttempts = Object.values(attemptsByMember);

          const lastAttempts = memberAttempts.map(attempts =>
            attempts.reduce((prevAttempt, attempt) =>
              prevAttempt.executedAt >= attempt.executedAt
                ? prevAttempt
                : attempt
              , { executedAt: 0 } as unknown as Attempt
            )
          );

          const failedAttempts = lastAttempts.filter(attemptByMember =>
            !attemptByMember.passed
          );

          const isMostlyFailing = failedAttempts.length > (memberAttempts.length / 2)

          return new Map([
            ...prevWeight.entries(),
            [
              weightId,
              isMostlyFailing
            ]
          ])
        }, new Map<number, boolean>())
      ]
    ]), new Map<number, Map<number, boolean>>()
  );

  const dimensionList = Array.from({length: MAX_DIMENSION}, (_, f) => f + 1)

  const workoutProgress = dimensionList.map((exerciseId) => ({
    exerciseId,
    weights: dimensionList.map((weightId) => {
      const isMostlyFailing = !!failingLastAttempts
          ?.get(exerciseId)
          ?.get(weightId);

      const hasAttempts = !!attemptsByExerciseAndWeight
          ?.get(exerciseId)
          ?.get(weightId)
          ?.length;

      return {
        key: `${exerciseId}x${weightId}`,
        weightId,
        isMostlyFailing: hasAttempts && isMostlyFailing,
        isAttempted: hasAttempts && !isMostlyFailing,
      }
    })
  }));

  return workoutProgress;
}

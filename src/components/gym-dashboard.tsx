import styled from "@emotion/styled";
import { useMemo } from "react";
import WorkoutMatrix from "./workout-matrix";
import GridLegend from "./grid-legend";
import { getAttemptsByDate, type DateOptionsType } from "../logic/dateFilter";

export type Attempt = {
  id: number;
  memberUuid: string;
  executedAt: {
    date: string;
  };
  exerciseId: number;
  weightId: number;
  passed: boolean;
};

const GymDashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function GymDashboard({
  date,
  attempts
}: {
  date: DateOptionsType,
  attempts: Attempt[]
}): React.ReactNode {

  const attemptsByDate = useMemo(() => getAttemptsByDate(attempts), [attempts]);

  const filteredAttempts = attemptsByDate.get(date) ?? [];

  return (
    <GymDashboardWrapper>
      <h3>Gym progress matrix (12 exercises × 12 weights)</h3>
      <WorkoutMatrix attempts={filteredAttempts} />
      <GridLegend />
    </GymDashboardWrapper>
  );
}

export default GymDashboard;

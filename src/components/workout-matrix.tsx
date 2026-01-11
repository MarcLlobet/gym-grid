import styled from "@emotion/styled";
import { useMemo } from "react";

import ProgressCell from "./progress-cell";
import type { Attempt } from "./gym-dashboard";
import { calculateWorkoutProgress, type WeightSummary } from "../logic/calculateWorkoutProgress";
import { MAX_DIMENSION } from "../constants";

const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
  margin-top: 16px;
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-weight: 500;
  border-bottom: 1px solid #e0e0e0;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:hover {
    background-color: #fafafa;
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
`;

type Props = {
  attempts: Attempt[];
};

const dimensionList = Array.from({length: MAX_DIMENSION}, (_, i) => i + 1);

const getCellStatus = ({
  isMostlyFailing,
  isAttempted
}: WeightSummary): "notSeen" | "inProgress" | "mostlyFailed" => {
  if (isMostlyFailing) {
    return "mostlyFailed";
  }
  return isAttempted ? "inProgress" : "notSeen";
}

function WorkoutMatrix({ attempts }: Props): React.ReactNode {

  const workoutProgress = useMemo(
    () => calculateWorkoutProgress(attempts),
    [attempts]
  );

  return (
    <Table>
      <TableHead>
        <tr>
          <TableHeader>E\W</TableHeader>
          {dimensionList.map(weightId => (
            <TableHeader key={weightId}>{weightId}</TableHeader>
          ))}
        </tr>
      </TableHead>
      <TableBody>
        {workoutProgress.map((summary) => (
          <TableRow key={summary.exerciseId}>
            <TableHeader>{summary.exerciseId}</TableHeader>
            {summary.weights.map((weight) => (
              <TableCell
                key={`${summary.exerciseId}-${weight.key}`}
              >
                <ProgressCell
                  label={`Exercise ${summary.exerciseId} - Weight ${weight.weightId}`}
                  status={getCellStatus(weight)}
                  variant="cell-small-size"
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default WorkoutMatrix;

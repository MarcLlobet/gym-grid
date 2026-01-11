import styled from "@emotion/styled";

const LegendSection = styled.section`
  margin-top: 32px;
  padding: 24px;
  background-color: #fafafa;
  border-radius: 8px;
  width: 90%;
`;

const LegendTitle = styled.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const LegendContainer = styled.div`
  display: flex;
  gap: 48px;
  flex-wrap: wrap;
`;

const LegendColumn = styled.div`
  flex: 1;
  min-width: 280px;
`;

const LegendSubtitle = styled.h5`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: #555;
`;

const LegendList = styled.ol`
  margin: 0;
  padding-left: 24px;
  font-size: 13px;
  line-height: 1.8;
  color: #666;
`;

const EXERCISES = [
  "Bench Press",
  "Squat",
  "Deadlift",
  "Shoulder Press",
  "Barbell Row",
  "Lat Pulldown",
  "Bicep Curl",
  "Tricep Extension",
  "Leg Press",
  "Lunges",
  "Plank",
  "Pull-ups",
];

const WEIGHTS = [
  "5 kg",
  "10 kg",
  "15 kg",
  "20 kg",
  "25 kg",
  "30 kg",
  "40 kg",
  "50 kg",
  "60 kg",
  "80 kg",
  "100 kg",
  "120 kg",
];

function GridLegend(): React.ReactNode {
  return (
    <LegendSection>
      <LegendTitle>Grid Dimensions Legend</LegendTitle>
      <LegendContainer>
        <LegendColumn>
          <LegendSubtitle>Rows - Exercises (1-12)</LegendSubtitle>
          <LegendList>
            {EXERCISES.map((exercise) => (
              <li key={exercise}>{exercise}</li>
            ))}
          </LegendList>
        </LegendColumn>
        <LegendColumn>
          <LegendSubtitle>Columns - Weights (1-12)</LegendSubtitle>
          <LegendList>
            {WEIGHTS.map((weight) => (
              <li key={weight}>{weight}</li>
            ))}
          </LegendList>
        </LegendColumn>
      </LegendContainer>
    </LegendSection>
  );
}

export default GridLegend;

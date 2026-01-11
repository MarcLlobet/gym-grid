import styled from "@emotion/styled";
import { TitleHeader } from "./title-header";
import DatePeriodSelector from "./date-period-selector";
import GymDashboard, { type Attempt } from "./gym-dashboard";
import { useCallback, useEffect, useState } from "react";
import { type DateOptionsType } from "../logic/dateFilter";
import { DATE_OPTIONS } from "../constants";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-top: 0.5rem;
  padding-left: 2rem;
`;

const MembersInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const url = `${import.meta.env.BASE_URL}attempts.json`;

export function MainLayout(): React.ReactNode {
  const [allAttempts, setAllAttempts] = useState<Attempt[]>([] as Attempt[]);
  const [date, setDate] = useState<DateOptionsType>(DATE_OPTIONS.all_time);

  const onChange = useCallback((value: DateOptionsType) => {
    setDate(value);
  }, []);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((attempts: Attempt[]) => {
        setAllAttempts(attempts);
      })
      .catch((error) => {
        console.error("Error getting data from API:", error);
      });
  }, []);

  return (
    <Container>
      <TitleHeader
        title="GymGrid"
        description="A fitness progress dashboard to track workout attempts across exercises and weights."
      />
      <MembersInfoWrapper>
        <DatePeriodSelector selectedOption={date} onChange={onChange} />
        <GymDashboard date={date} attempts={allAttempts} />
      </MembersInfoWrapper>
    </Container>
  );
}

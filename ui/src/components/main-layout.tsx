import styled from "@emotion/styled";
import { TitleHeader } from "./title-header";
import FluencyDatePeriodDropdown from "./fluency-date-period-dropdown";
import FluencyDashboard, { type Attempt } from "./fluency-dashboard";
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

const StudentsInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const isProd = import.meta.env.PROD;
const url = isProd 
  ? './attempts.json' 
  : 'http://localhost:8080/attempts';

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
        title="Fluency report"
        description="It is a space within Individualized Practice designed to consolidate and automate basic arithmetic operations."
      />
      <StudentsInfoWrapper>
        <FluencyDatePeriodDropdown selectedOption={date} onChange={onChange} />
        <FluencyDashboard date={date} attempts={allAttempts} />
      </StudentsInfoWrapper>
    </Container>
  );
}

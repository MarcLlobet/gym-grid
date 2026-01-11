import type { Attempt } from "../components/gym-dashboard";
import { DATE_OPTIONS } from "../constants";

export type DateOptionsType = keyof typeof DATE_OPTIONS;

const getDateValue = (dateString: DateOptionsType): number => {
  if(dateString === DATE_OPTIONS.all_time) {
    return 0;
  }

  const currentDate = new Date();

  const relativeDate = new Date(
    currentDate.getFullYear(),
    DATE_OPTIONS.past_month === dateString
      ? currentDate.getMonth() - 1
      : currentDate.getMonth(),
    DATE_OPTIONS.current_sprint === dateString
      ? currentDate.getDate() - 7
      : currentDate.getDate(),
    currentDate.getHours(),
    currentDate.getMinutes()
  );

  return relativeDate.getTime();
}

export const getAttemptsByDate = (attempts: Attempt[]): Map<DateOptionsType, Attempt[]> =>
   Map.groupBy(attempts, ({ executedAt }) => {
    const executedAtTime = new Date(executedAt.date).getTime();
    if(executedAtTime >= getDateValue(DATE_OPTIONS.current_sprint)) {
      return DATE_OPTIONS.current_sprint;
    }
    if(executedAtTime >= getDateValue(DATE_OPTIONS.past_month)) {
      return DATE_OPTIONS.past_month;
    }
    return DATE_OPTIONS.all_time;
  });

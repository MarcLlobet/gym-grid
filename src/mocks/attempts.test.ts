import { DATE_OPTIONS } from "../constants";
import { getAttemptsByDate } from "../logic/dateFilter";
import { mockAttempts } from "./attempts";
import { describe, expect, it } from "vitest";

describe("mockAttempts date filtering", () => {
  const attemptsByDate = getAttemptsByDate(mockAttempts);
  it("returns 10 attempts for this week", () => {
    expect(attemptsByDate.get(DATE_OPTIONS.current_sprint)).toHaveLength(10);
  });
  it("returns 10 attempts for past month", () => {
    expect(attemptsByDate.get(DATE_OPTIONS.past_month)).toHaveLength(10);
  });
  it("returns 10 attempts for all time", () => {
    expect(attemptsByDate.get(DATE_OPTIONS.all_time)).toHaveLength(10);
  });
});

import { getAttemptsByDate } from "./dateFilter";
import { DATE_OPTIONS } from "../constants";
import { describe, expect, it } from "vitest";
import type { Attempt } from "../components/gym-dashboard";

const currentDate = new Date();

const thisWeek = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() - 7,
  currentDate.getHours(),
  currentDate.getMinutes()
);

const pastMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() - 1,
  currentDate.getDate(),
  currentDate.getHours(),
  currentDate.getMinutes()
);

const old = new Date(
  currentDate.getFullYear() - 1,
  currentDate.getMonth(),
  currentDate.getDate(),
  currentDate.getHours(),
  currentDate.getMinutes()
);

describe("getAttemptsByDate", () => {
    it("returns undefined for all periods if no attempts", () => {
        const result = getAttemptsByDate([]);
        expect(result.get(DATE_OPTIONS.current_sprint)).toBeUndefined();
        expect(result.get(DATE_OPTIONS.past_month)).toBeUndefined();
        expect(result.get(DATE_OPTIONS.all_time)).toBeUndefined();
    });

    it("groups attempts correctly for each period", () => {
        const attempts: Attempt[] = [
            { id: 1, executedAt: { date: thisWeek.toISOString() }, memberUuid: "a", exerciseId: 2, weightId: 3, passed: true },
            { id: 2, executedAt: { date: pastMonth.toISOString() }, memberUuid: "b", exerciseId: 2, weightId: 3, passed: false },
            { id: 3, executedAt: { date: old.toISOString() }, memberUuid: "c", exerciseId: 2, weightId: 3, passed: true },
        ];
        const result = getAttemptsByDate(attempts);

        expect(result.get(DATE_OPTIONS.current_sprint)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ memberUuid: "a" })
            ])
        );

        expect(result.get(DATE_OPTIONS.past_month)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ memberUuid: "b" })
            ])
        );

        expect(result.get(DATE_OPTIONS.all_time)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ memberUuid: "c" })
            ])
        );
    });

    it("handles multiple attempts in the same period", () => {
        const attempts: Attempt[] = [
            { id: 1, executedAt: { date: thisWeek.toISOString() }, memberUuid: "a", exerciseId: 2, weightId: 3, passed: true },
            { id: 2, executedAt: { date: thisWeek.toISOString() }, memberUuid: "b", exerciseId: 2, weightId: 3, passed: false },
            { id: 3, executedAt: { date: pastMonth.toISOString() }, memberUuid: "c", exerciseId: 2, weightId: 3, passed: true },
            { id: 4, executedAt: { date: old.toISOString() }, memberUuid: "d", exerciseId: 2, weightId: 3, passed: false },
        ];
        const result = getAttemptsByDate(attempts);
        expect(result.get(DATE_OPTIONS.current_sprint)).toHaveLength(2);
        expect(result.get(DATE_OPTIONS.past_month)).toHaveLength(1);
        expect(result.get(DATE_OPTIONS.all_time)).toHaveLength(1);
    });

    it("handles overlapping dates (boundary conditions)", () => {
        // Use fixed dates for deterministic boundary tests
        const thisWeekBoundary = new Date("2025-12-15T10:00:00.000Z"); // exactly 7 days before thisWeek
        const pastMonthBoundary = new Date("2025-11-21T10:00:00.000Z"); // exactly 1 month before thisWeek
        const attempts: Attempt[] = [
            { id: 1, executedAt: { date: thisWeekBoundary.toISOString() }, memberUuid: "w", exerciseId: 2, weightId: 3, passed: true },
            { id: 2, executedAt: { date: pastMonthBoundary.toISOString() }, memberUuid: "m", exerciseId: 2, weightId: 3, passed: false },
        ];
        const result = getAttemptsByDate(attempts);
        expect(result.get(DATE_OPTIONS.past_month)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ memberUuid: "w" })
            ])
        );
        expect(result.get(DATE_OPTIONS.all_time)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ memberUuid: "m" })
            ])
        );
    });

    it("does not mutate the input array", () => {
        const attempts: Attempt[] = [
            { id: 1, executedAt: { date: thisWeek.toISOString() }, memberUuid: "a", exerciseId: 2, weightId: 3, passed: true },
            { id: 2, executedAt: { date: pastMonth.toISOString() }, memberUuid: "b", exerciseId: 2, weightId: 3, passed: false },
            { id: 3, executedAt: { date: old.toISOString() }, memberUuid: "c", exerciseId: 2, weightId: 3, passed: true },
        ];
        const original = JSON.stringify(attempts);
        getAttemptsByDate(attempts);
        expect(JSON.stringify(attempts)).toBe(original);
    });
});

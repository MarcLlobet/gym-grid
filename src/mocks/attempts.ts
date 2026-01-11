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

export const mockAttempts: Attempt[] = [
  {
    id: 1,
    memberUuid: "member-week-1",
    executedAt: {
      date: thisWeek.toISOString()
    },
    exerciseId: 2,
    weightId: 3,
    passed: true
  },
  {
    id: 2,
    memberUuid: "member-week-2",
    executedAt: {
      date: thisWeek.toISOString()
    },
    exerciseId: 2,
    weightId: 3,
    passed: false
  },
  {
    id: 3,
    memberUuid: "member-week-3",
    executedAt: {
      date: thisWeek.toISOString()
    },
    exerciseId: 2,
    weightId: 3,
    passed: true
  },
  {
    id: 4,
    memberUuid: "member-week-4",
    executedAt: {
      date: thisWeek.toISOString()
    },
    exerciseId: 2,
    weightId: 3,
    passed: false
  },
  {
    id: 5,
    memberUuid: "member-week-5",
    executedAt: {
      date: thisWeek.toISOString()
    },
    exerciseId: 2,
    weightId: 3,
    passed: true
  },
  {
    id: 6,
    memberUuid: "member-week-6",
    executedAt: {
      date: thisWeek.toISOString()
    },
    exerciseId: 2,
    weightId: 3,
    passed: false
  },
  {
    id: 7,
    memberUuid: "member-week-7",
    executedAt: {
      date: thisWeek.toISOString()
    },
    exerciseId: 2,
    weightId: 3,
    passed: true
  },
  {
    id: 8,
    memberUuid: "member-week-8",
    executedAt: {
      date: thisWeek.toISOString()
    },
    exerciseId: 2,
    weightId: 3,
    passed: false
  },
  {
    id: 9,
    memberUuid: "member-week-9",
    executedAt: {
      date: thisWeek.toISOString()
    },
    exerciseId: 2,
    weightId: 3,
    passed: true
  },
  {
    id: 10,
    memberUuid: "member-week-10",
    executedAt: {
      date: thisWeek.toISOString()
    },
    exerciseId: 2,
    weightId: 3,
    passed: false
  },

  {
    id: 101,
    memberUuid: "member-month-1",
    executedAt: {
      date: pastMonth.toISOString()
    },
    exerciseId: 4,
    weightId: 5,
    passed: false
  },
  {
    id: 102,
    memberUuid: "member-month-2",
    executedAt: {
      date: pastMonth.toISOString()
    },
    exerciseId: 4,
    weightId: 5,
    passed: true
  },
  {
    id: 103,
    memberUuid: "member-month-3",
    executedAt: {
      date: pastMonth.toISOString()
    },
    exerciseId: 4,
    weightId: 5,
    passed: false
  },
  {
    id: 104,
    memberUuid: "member-month-4",
    executedAt: {
      date: pastMonth.toISOString()
    },
    exerciseId: 4,
    weightId: 5,
    passed: true
  },
  {
    id: 105,
    memberUuid: "member-month-5",
    executedAt: {
      date: pastMonth.toISOString()
    },
    exerciseId: 4,
    weightId: 5,
    passed: false
  },
  {
    id: 106,
    memberUuid: "member-month-6",
    executedAt: {
      date: pastMonth.toISOString()
    },
    exerciseId: 4,
    weightId: 5,
    passed: true
  },
  {
    id: 107,
    memberUuid: "member-month-7",
    executedAt: {
      date: pastMonth.toISOString()
    },
    exerciseId: 4,
    weightId: 5,
    passed: false
  },
  {
    id: 108,
    memberUuid: "member-month-8",
    executedAt: {
      date: pastMonth.toISOString()
    },
    exerciseId: 4,
    weightId: 5,
    passed: true
  },
  {
    id: 109,
    memberUuid: "member-month-9",
    executedAt: {
      date: pastMonth.toISOString()
    },
    exerciseId: 4,
    weightId: 5,
    passed: false
  },
  {
    id: 110,
    memberUuid: "member-month-10",
    executedAt: {
      date: pastMonth.toISOString()
    },
    exerciseId: 4,
    weightId: 5,
    passed: true
  },

  {
    id: 201,
    memberUuid: "member-old-1",
    executedAt: {
      date: old.toISOString()
    },
    exerciseId: 6,
    weightId: 7,
    passed: true
  },
  {
    id: 202,
    memberUuid: "member-old-2",
    executedAt: {
      date: old.toISOString()
    },
    exerciseId: 6,
    weightId: 7,
    passed: false
  },
  {
    id: 203,
    memberUuid: "member-old-3",
    executedAt: {
      date: old.toISOString()
    },
    exerciseId: 6,
    weightId: 7,
    passed: false
  },
  {
    id: 204,
    memberUuid: "member-old-4",
    executedAt: {
      date: old.toISOString()
    },
    exerciseId: 6,
    weightId: 7,
    passed: true
  },
  {
    id: 205,
    memberUuid: "member-old-5",
    executedAt: {
      date: old.toISOString()
    },
    exerciseId: 6,
    weightId: 7,
    passed: false
  },
  {
    id: 206,
    memberUuid: "member-old-6",
    executedAt: {
      date: old.toISOString()
    },
    exerciseId: 6,
    weightId: 7,
    passed: false
  },
  {
    id: 207,
    memberUuid: "member-old-7",
    executedAt: {
      date: old.toISOString()
    },
    exerciseId: 6,
    weightId: 7,
    passed: true
  },
  {
    id: 208,
    memberUuid: "member-old-8",
    executedAt: {
      date: old.toISOString()
    },
    exerciseId: 6,
    weightId: 7,
    passed: false
  },
  {
    id: 209,
    memberUuid: "member-old-9",
    executedAt: {
      date: old.toISOString()
    },
    exerciseId: 6,
    weightId: 7,
    passed: false
  },
  {
    id: 210,
    memberUuid: "member-old-10",
    executedAt: {
      date: old.toISOString()
    },
    exerciseId: 6,
    weightId: 7,
    passed: true
  },
];

export const MAX_DIMENSION = 12;

export const DATE_OPTIONS = {
    all_time: "all_time",
    past_month: "past_month",
    current_sprint: "current_sprint",
} as const;

export const DATE_OPTIONS_LABEL = {
    [DATE_OPTIONS.all_time]: "All time",
    [DATE_OPTIONS.past_month]: "Past month",
    [DATE_OPTIONS.current_sprint]: "This sprint",
} as const;
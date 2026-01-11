# Gym Grid

Gym Grid is a dashboard for gym trainers to monitor their members' workout progress. Members attempt exercises at different weight levels, and the dashboard visualizes which exercise-weight combinations are being mastered versus still challenging.

## Data Model

### Attempt Entity

Each workout attempt is recorded as an `Attempt` with the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Unique identifier |
| `memberUuid` | UUID | Identifies the gym member |
| `executedAt` | datetime | When the attempt was made |
| `exerciseId` | integer (1-12) | The exercise being attempted |
| `weightId` | integer (1-12) | The weight level |
| `passed` | boolean | Whether the attempt was successful (completed reps) or failed |

### Grid Dimensions

**Rows - Exercises (1-12):**
1. Bench Press
2. Squat
3. Deadlift
4. Shoulder Press
5. Barbell Row
6. Lat Pulldown
7. Bicep Curl
8. Tricep Extension
9. Leg Press
10. Lunges
11. Plank
12. Pull-ups

**Columns - Weights (1-12):**
1. 5 kg
2. 10 kg
3. 15 kg
4. 20 kg
5. 25 kg
6. 30 kg
7. 40 kg
8. 50 kg
9. 60 kg
10. 80 kg
11. 100 kg
12. 120 kg

## Progress Status

Each cell in the 12x12 matrix represents an exercise-weight combination with one of three statuses:

| Status | Color | Description |
|--------|-------|-------------|
| Not Attempted | Gray | No attempts recorded for this combination |
| Progressing | Green | Attempts made, majority successful |
| Struggling | Red | Attempts made, >50% of latest attempts failed |

The status is calculated by looking at the most recent attempt from each member for a given exercise-weight pair. If more than half of these latest attempts failed, the cell is marked as "Struggling".

## Date Filtering

The dashboard supports filtering by time period:
- **This week**: Attempts from the last 7 days
- **Past month**: Attempts from the last 30 days
- **All time**: All recorded attempts

## Tech Stack

- **Framework**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Emotion (CSS-in-JS)
- **Data Processing**: Functional programming with `Map.groupBy`, `Object.groupBy`, and `useMemo` for efficient transformations

## Getting Started

```bash
npm install
npm run dev      # Access at http://localhost:5173
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run unit tests |
| `npm run lint` | Run ESLint |
| `npm run fixtures` | Generate test data |

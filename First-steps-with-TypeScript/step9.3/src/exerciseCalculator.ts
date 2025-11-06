// src/exerciseCalculator.ts

export interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: 1 | 2 | 3;
    ratingDescription: string;
    target: number;
    average: number;
}

const getRating = (average: number, target: number): { rating: 1 | 2 | 3, ratingDescription: string } => {
    const ratio = average / target;
    if (ratio >= 1) {
        return { rating: 3, ratingDescription: 'excellent, target achieved' };
    } else if (ratio >= 0.75) {
        return { rating: 2, ratingDescription: 'not too bad but could be better' };
    } else {
        return { rating: 1, ratingDescription: 'poor, far from target' };
    }
};

export const calculateExercises = (dailyHours: number[], target: number): Result => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(h => h > 0).length;
    const totalHours = dailyHours.reduce((sum, h) => sum + h, 0);
    const average = periodLength > 0 ? totalHours / periodLength : 0;
    const success = average >= target;
    const { rating, ratingDescription } = getRating(average, target);

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};
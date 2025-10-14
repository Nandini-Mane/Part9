interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

/**
 * Calculates the average exercise hours, compares it to a target, and returns a detailed result object.
 * * @param dailyExerciseHours An array of numbers representing daily exercise hours.
 * @param targetHours The target amount of daily exercise hours.
 * @returns An object containing exercise statistics and a rating.
 */
const calculateExercises = (dailyExerciseHours: number[], targetHours: number): Result => {
    // Total number of days in the period
    const periodLength = dailyExerciseHours.length;

    // Filter for days with more than 0 exercise hours
    const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;

    // Calculate the total hours and then the average
    const totalHours = dailyExerciseHours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;

    // Determine if the target was met
    const success = average >= targetHours;

    // Assign a rating and description based on how close the average is to the target
    let rating: number;
    let ratingDescription: string;

    if (average >= targetHours) {
        rating = 3;
        ratingDescription = 'Great job! You reached your target.';
    } else if (average >= targetHours * 0.9) {
        rating = 2;
        ratingDescription = 'Not bad, but you could do better.';
    } else {
        rating = 1;
        ratingDescription = 'You need to put in more effort.';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: targetHours,
        average,
    };
};

// Hard-coded call to the function and printing the result
const exerciseData = [3, 0, 2, 4.5, 0, 3, 1];
const dailyTarget = 2;
console.log(calculateExercises(exerciseData, dailyTarget));

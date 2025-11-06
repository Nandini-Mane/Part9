/**
 * Calculates the average exercise hours, compares it to a target, and returns a detailed result object.
 * * @param dailyExerciseHours An array of numbers representing daily exercise hours.
 * @param targetHours The target amount of daily exercise hours.
 * @returns An object containing exercise statistics and a rating.
 */
var calculateExercises = function (dailyExerciseHours, targetHours) {
    // Total number of days in the period
    var periodLength = dailyExerciseHours.length;
    // Filter for days with more than 0 exercise hours
    var trainingDays = dailyExerciseHours.filter(function (hours) { return hours > 0; }).length;
    // Calculate the total hours and then the average
    var totalHours = dailyExerciseHours.reduce(function (sum, hours) { return sum + hours; }, 0);
    var average = totalHours / periodLength;
    // Determine if the target was met
    var success = average >= targetHours;
    // Assign a rating and description based on how close the average is to the target
    var rating;
    var ratingDescription;
    if (average >= targetHours) {
        rating = 3;
        ratingDescription = 'Great job! You reached your target.';
    }
    else if (average >= targetHours * 0.9) {
        rating = 2;
        ratingDescription = 'Not bad, but you could do better.';
    }
    else {
        rating = 1;
        ratingDescription = 'You need to put in more effort.';
    }
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetHours,
        average: average,
    };
};
// Hard-coded call to the function and printing the result
var exerciseData = [3, 0, 2, 4.5, 0, 3, 1];
var dailyTarget = 2;
console.log(calculateExercises(exerciseData, dailyTarget));

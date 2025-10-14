<<<<<<< HEAD
import { parseExerciseArguments } from "./utils.ts";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours > 0).length;
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;

  let rating;
  let ratingDescription;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'target reached, excellent job!';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you need to put in more effort';
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { target, dailyHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'An error occurred.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
=======
import { parseExerciseArguments } from "./utils.ts";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours > 0).length;
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;

  let rating;
  let ratingDescription;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'target reached, excellent job!';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you need to put in more effort';
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { target, dailyHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'An error occurred.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
>>>>>>> 534f0d7baea23ffd5e45702c2883bd7b03e6f974

// src/exerciseCalculatorCLI.ts
import { parseArguments } from './utils';
import { calculateExercises } from './exerciseCalculator';

const calculateExercisesCLI = () => {
    try {
        const numbers = parseArguments(process.argv);

        // First number is the target, rest are daily hours
        const [target, ...dailyHours] = numbers;

        if (numbers.length < 2) {
            throw new Error('At least two arguments required: target (number) and daily hours (list of numbers).');
        }

        if (target < 0 || dailyHours.some(h => h < 0)) {
             throw new Error('All values must be non-negative numbers.');
        }

        const result = calculateExercises(dailyHours, target);
        console.log(JSON.stringify(result, null, 2));

    } catch (error: unknown) {
        let errorMessage = 'An error occurred:';
        if (error instanceof Error) {
            errorMessage += ` Error: ${error.message}`;
        }
        console.error(errorMessage);
        process.exit(1);
    }
};

calculateExercisesCLI();
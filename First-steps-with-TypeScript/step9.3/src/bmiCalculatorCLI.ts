// src/bmiCalculatorCLI.ts
import { parseArguments } from './utils';
import { calculateBmi } from './bmiCalculator';

const calculateBmiCLI = () => {
    try {
        const numbers = parseArguments(process.argv);

        if (numbers.length !== 2) {
            throw new Error('Two arguments required: height (cm) and weight (kg).');
        }

        const [height, weight] = numbers;

        if (height <= 0 || weight <= 0) {
             throw new Error('Height and weight must be positive numbers.');
        }

        const result = calculateBmi(height, weight);
        console.log(result);

    } catch (error: unknown) {
        let errorMessage = 'An error occurred:';
        if (error instanceof Error) {
            errorMessage += ` Error: ${error.message}`;
        }
        console.error(errorMessage);
        process.exit(1);
    }
};

calculateBmiCLI();
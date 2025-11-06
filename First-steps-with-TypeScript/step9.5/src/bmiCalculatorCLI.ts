import { parseArguments } from './utils';
import { calculateBmi } from './bmiCalculator';

const calculateBmiCLI = () => {
    try {
        const numbers = parseArguments(process.argv);

        if (numbers.length !== 2) {
            throw new Error('Two arguments required: height (cm) and weight (kg).');
        }

        const [height, weight] = numbers;

        // Validation for non-positive values (though done in calculateBmi too, good practice for CLI)
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

// Only execute the CLI logic if the file is run directly (not imported)
if (require.main === module) {
    calculateBmiCLI();
}

/**
 * A function to calculate the Body Mass Index (BMI) and provide a message based on the result.
 * * @param heightInCm The height in centimeters.
 * @param weightInKg The weight in kilograms.
 * @returns A string message indicating the BMI category.
 */
const calculateBmi = (heightInCm: number, weightInKg: number): string => {
    // Convert height from centimeters to meters.
    const heightInM = heightInCm / 100;

    // Calculate BMI using the formula: BMI = weight / (height)^2
    const bmi = weightInKg / (heightInM * heightInM);

    // Determine the message based on the BMI value.
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return "Normal range";
    } else if (bmi >= 25 && bmi <= 29.9) {
        return "Overweight";
    } else {
        return "Obese";
    }
};

// Call the function with hard-coded parameters as requested and print the result.
console.log(calculateBmi(180, 74));

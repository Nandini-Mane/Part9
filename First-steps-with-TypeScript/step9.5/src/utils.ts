export const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

export const parseArguments = (args: string[]): number[] => {
    // Slice off 'node' path (index 0) and script path (index 1)
    const numericArgs = args.slice(2);

    if (numericArgs.length === 0) {
        // Will be caught by CLI wrappers, but good practice
        throw new Error('Please provide at least one argument.');
    }

    const parsedNumbers: number[] = [];

    for (const arg of numericArgs) {
        if (isNotNumber(arg)) {
            throw new Error(`Provided values were not all numbers! Input: ${arg}`);
        }
        parsedNumbers.push(Number(arg));
    }

    return parsedNumbers;
};

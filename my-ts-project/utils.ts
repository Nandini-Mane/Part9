export const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

export const parseBmiArguments = (args: string[]): { value1: number; value2: number } => {
  if (args.length < 4) throw new Error('Not enough arguments. Please provide height (cm) and weight (kg).');
  if (args.length > 4) throw new Error('Too many arguments. Please provide only height (cm) and weight (kg).');

  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    value1: Number(args[2]),
    value2: Number(args[3])
  };
};

export const parseExerciseArguments = (args: string[]): { target: number; dailyHours: number[] } => {
  if (args.length < 3) throw new Error('Not enough arguments. Please provide the target and at least one day of exercise hours.');
  
  const target = Number(args[2]);
  if (isNotNumber(target)) {
    throw new Error('The first argument (target) must be a number.');
  }

  const dailyHours = args.slice(3).map(hour => Number(hour));
  if (dailyHours.some(isNotNumber)) {
    throw new Error('All exercise hours must be numbers.');
  }

  return {
    target,
    dailyHours
  };
};

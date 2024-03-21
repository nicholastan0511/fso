interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number,
  ratingDescription: string;
  target: number;
  average: number
}

interface Vals {
  target: number;
  daily: number[];
}

const parseArgs = (args: string[]): Vals => {
  if (args.length < 4) throw new Error('Not enough arguments!')

  const daily = []

  //check if provided arguments are number types
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i])))
      throw new Error('Some of the provided arguments are not numbers!')
    else 
      daily.push(Number(args[i]))
  }
  
  //remove the first element as it is the target
  daily.shift()

  return {
    target: Number(args[2]),
    daily
  }
}

const calculateExercises = (daily: number[], target: number): Result => {
  const periodLength = daily.length;

  let missedTraining = 0;
  daily.forEach(time => {
    if (time == 0) {
      missedTraining += 1
    }
  })

  const trainingDays = daily.length - missedTraining;
  const rating = trainingDays == 7 
    ? 3 : trainingDays >= 3 && trainingDays <= 6 
    ? 2 : 1

  const ratingDescription = rating == 3
    ? 'Perfect' : rating == 2
    ? 'Not bad. There\'s a room for improvement!' : 'You are better than this!'

  let average = 0;

  daily.forEach((hours, i) => {
    average += hours;
    if (i == daily.length - 1)
      average /= daily.length
  })

  const success = average >= target ? true : false;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  const { target, daily } = parseArgs(process.argv)
  console.log(calculateExercises(daily, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened!'
  if (error instanceof Error) {
    errorMessage += error.message
  }

  console.log(errorMessage)
}
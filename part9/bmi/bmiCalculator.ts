interface Values {
  height: number
  weight: number
}

const parseArguments = (args: string[]): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  //to check if the given arguments are number types
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const bmiCalc = (height: number, weight: number) => {
  const bmi = weight / (height/100)**2
  if (bmi < 18.5)
    console.log('Underweight')
  else if (18.5 <= bmi && bmi <= 24.9) 
    console.log('Normal (healthy weight)')
  else if (25 <= bmi && bmi <= 29.9) 
    console.log('Overweight')
  else
    console.log('Obesity')
}

try {
  const { height, weight } = parseArguments(process.argv);
  bmiCalc(height, weight)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
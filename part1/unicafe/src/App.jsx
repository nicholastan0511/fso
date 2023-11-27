import { useState } from 'react'

const App = () => {

  const [rating, setRating] = useState({neutral: 0, good: 0, bad: 0})

  console.log(rating)

  const setRatingTo = (val) => () => {
    console.log(val)
    setRating({...rating, [val]: rating[val] + 1})
  }

  let total = 0

  for (let i in rating) {
    total += rating[i]
  }

  console.log(total)

  const positivePercentage = () => {
    if (rating.good > 0)
      return rating.good / total * 100 + '%'
    return 'please rate me guuuuud'
  }

  const computeAverage = () => {
    return (rating.good + rating.bad * -1) / total
  }


  return (
    <div>
      <Header header='give feedback'/>
      <Button onSmash={setRatingTo('neutral')} text='neutral'/>
      <Button onSmash={setRatingTo('good')} text='good'/>
      <Button onSmash={setRatingTo('bad')} text='bad'/>
      <Header header='statistics'/>
      <table>
        <thead>
          <TableHead total={total}/>
        </thead>
        <tbody>
          <TableContent type='neutral' number={rating.neutral} total={total}/>
          <TableContent type='good' number={rating.good} total={total}/>
          <TableContent type='bad' number={rating.bad} total={total}/>
          <TableContent type='average' number={computeAverage()} total={total}/>
          <TableContent type='positive' number={positivePercentage()} total={total}/>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ onSmash, text }) => {
  return (
    <button onClick={onSmash}>{text}</button>
  )
}

const Header = ({ header }) => {
  return (
    <h2>{header}</h2>
  )
}

const TableHead = ({ total }) => {
  if (total <= 0) {
    return (
      <tr>
        <td>please rate me good</td>
      </tr>
    );
  }
   
  return (
    <tr>
      <td>stats</td>
      <td>number</td>
    </tr>
  )
}

const TableContent = (props) => {
  if (props.total <= 0)
    return
  return (
    <tr>
      <td>{props.type}</td>
      <td>{props.number}</td>
    </tr>
  )
} 

export default App
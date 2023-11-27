import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))

  const [mostVote, setMostVote] = useState(0)

  const nextAnec = () => setSelected(Math.floor(Math.random() * anecdotes.length) )
  const castVote = () => {
    let newVote = [...vote]
    newVote[selected] += 1

    setMostVote(findMostVote(newVote))

    setVote(newVote)
  }

  const findMostVote = (val) => {
    let mostVote = 0
    for (let i = 0; i < val.length; i++) {
      if (mostVote < val[i]) {
        mostVote = val[i]
      }
    }

    return val.indexOf(mostVote)
  }

  return (
    <div>
      <Header header='Anecdote of the Day'/>
      <div>
      {anecdotes[selected]}
      <div>
        has {vote[selected]} votes
      </div>
        <Button onClick={castVote} text='vote'/>
        <Button onClick={nextAnec} text='next anecdote'/>
      </div>
      <Header header='Anecdote with the Most Votes'/>
      <div>
        {anecdotes[mostVote]}
      </div>
  
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Header = ({ header }) => <h2>{header}</h2>

export default App
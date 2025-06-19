import { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Anecdote = ({anecdotes, votes}) => {
  
  let max = Math.max(...votes)

  if(max.length > 1){
    max = max[0]
  }

  const indexMax = votes.indexOf(max)

  return (
    <div>
      <p>{anecdotes[indexMax]}</p>
      <p>Votes: {votes[indexMax]}</p>
    </div>
  )
}

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

  const arr_votes = Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(arr_votes)

  const randomNumber = () => {
    const random =  Math.floor(Math.random() * anecdotes.length)

    setSelected(random)
    return
  }

  const addVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    return
  }

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>

      <Button handleClick={addVote} text="Vote anecdote"></Button>
      <Button handleClick = {randomNumber} text = "Random anecdote"></Button>
      <br></br>
      <br></br>
      
      <h3>Anecdote with most votes</h3>
      <Anecdote anecdotes = {anecdotes} votes = {votes}></Anecdote>

      {votes.join(', ')}
    </div>
  )
}

export default App

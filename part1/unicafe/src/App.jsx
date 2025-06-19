import { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button> 

const StatisticLine = (props) => <p>{props.text}: {props.value}</p>

const Row = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Table = ({good, neutral, bad}) => {
  return (
    <table>
      <tbody>
        <Row text = "Good" value = {good}></Row>
        <Row text = "Neutral" value = {neutral}></Row>
        <Row text = "Bad" value = {bad}></Row>
      </tbody>
    </table>
  )
}

const Average = (props) =>{ return props.total == 0 ? <p>Average: 0</p> : <p>Average: {props.good / props.total}</p> }

const Display = ({good, bad, neutral}) => {

  const total = (good + neutral + bad)
  const puntuation = good + neutral * 0 + bad * -1

  return (
    <div>
      <StatisticLine text = "Good" value = {good}></StatisticLine>
      <StatisticLine text = "Neutral" value = {neutral}></StatisticLine>
      <StatisticLine text = "Bad" value = {bad}></StatisticLine>

      <Table good = {good} neutral={neutral} bad={bad}></Table>
      
      <br></br>
      <p>Total: {total}</p>
      <Average good = {good} total = {total}></Average>
      
      <p>Puntuation: {puntuation}</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3>Give feedback</h3>
      <Button handleClick = {() => {setGood(good + 1)}} text = "Good"></Button>
      <Button handleClick = {() => {setNeutral(neutral + 1)}} text = "Neutral"></Button>
      <Button handleClick = {() => {setBad(bad + 1)}} text = "Bad"></Button>

      <h3>Statistics</h3>
      <Display good = {good} bad = {bad} neutral = {neutral}></Display>
      
    </div>
  )
}

export default App

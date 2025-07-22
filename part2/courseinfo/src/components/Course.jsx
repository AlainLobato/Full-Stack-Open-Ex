const Course = ({course}) => {

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {

  return (
    <div>
      {props.parts.map((part) => <Part key={part.id} part={part} /> )}
    </div>
  )
}

const Part = (props) => <p>{props.part.name}: {props.part.exercises}</p>

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return <p>Number of exercises: {total}</p>
}

export default Course

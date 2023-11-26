const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  

  return (
    <div>
      <Header title={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>  
    </div>
  )
}

const Content = (props) => {

  const parts = props.parts.map((item, index) => (
    <Part name={item.name} number={item.exercises} key={index}/>
  ));

  return (
    <div>
      {/* <Part name={props.parts[0].name} number={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} number={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} number={props.parts[2].exercises}/> */}
      {parts}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.number}</p>
  )
}

const Total = (props) => {

  const total = props.parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <div>
      <p>{total}</p>
    </div>
  )
}


export default App
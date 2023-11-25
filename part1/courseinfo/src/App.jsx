const App = () => {

  const courseName = 'Half Stack application development'

  const numbers = [10, 7, 14]

  return (
    <div>
      <Header title={courseName}/>
      <Content />
      <Total total={numbers}/>
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

const Content = () => {
  return (
    <div>
      <Part name='Fundamentals of React' number='10'/>
      <Part name='Using props to pass data' number='7'/>
      <Part name='State of a component' number='14'/>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.number}</p>
  )
}

const Total = (props) => {
  const total = props.total.reduce((acc, num) => acc + num, 0);

  return (
    <div>
      <p>{total}</p>
    </div>
  )
}


export default App
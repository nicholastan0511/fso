const Part = ({ partName, exercises }) => {
    return (
      <p>{partName} {exercises}</p>
    )
}

const Title = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
}

const Total = ({ total }) => {
    const sum = total.reduce((acc, num) => acc + num.exercises, 0)

    return (
        <p><b>total of {sum} exercises</b></p>
    )
}

export { Part, Title, Total }
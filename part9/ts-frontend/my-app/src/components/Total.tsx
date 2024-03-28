interface props { 
  total: number;
}

const Total = (props: props) => {
  return (
    <>
      <p>Number of exercises is {props.total}</p>
    </>
  )
}

export default Total;
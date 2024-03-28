interface props { 
  header: string;
}

const Header = (props: props) => {
  return (
    <>
      <h1>{props.header}</h1>
    </>
  )
}

export default Header
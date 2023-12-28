const Error = ({ mes }) => {
  if (mes === null)
    return null
  return (
    <div className="error">
      {mes}
    </div>
  )
}

export default Error
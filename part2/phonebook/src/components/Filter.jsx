const Filter = ({ changeFilter, filter }) => {
  return(
    <div>
      filter: <input onChange={changeFilter} value={filter}/>
    </div>
  )
}

export default Filter
  
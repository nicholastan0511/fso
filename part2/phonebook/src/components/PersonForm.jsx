const PersonForm = (props) => {
    const {trackNewName, trackNewNum, newName, newNum, addNewPerson} = props
  
    return (
      <form>
        <div>
          name: <input onChange={trackNewName} value={newName}/>
        </div>
        <div>
          number: <input onChange={trackNewNum} value={newNum}/>
        </div>
        <div>
          <button type="submit" onClick={addNewPerson}>add</button>
        </div>
      </form>
    )
}

export default PersonForm
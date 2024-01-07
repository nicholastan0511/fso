import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notification = useSelector(state => state.notification)

  console.log(notification)

  return (
    <div style={notification ? style : { display: 'none' }}>
      {notification}
    </div>
  )
}

export default Notification
import { createContext, useReducer, useContext } from "react"

const notifReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return `voted for ${action.payload}!`
    case 'CREATE':
      return `${action.payload} created!`
    case 'RESET':
      return ''
    case 'ERROR':
      return `ERROR! ${action.payload}`
    default:
      return ''
  }
}

const NotifContext = createContext()

export const NotifContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notifReducer, '')

  return (
    <NotifContext.Provider value={[notif, notifDispatch]}>
      {props.children}
    </NotifContext.Provider>
  )
}

export const useNotifVal = () => {
  const notifValAndDispatch = useContext(NotifContext)
  console.log(notifValAndDispatch[0])
  return notifValAndDispatch[0]
}

export const useNotifDispatch = () => {
  const notifValAndDispatch = useContext(NotifContext)
  return notifValAndDispatch[1]
}

export default NotifContext

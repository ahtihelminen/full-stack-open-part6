import NotificationContext from "../notificationContext"
import { useContext } from "react"

const Notification = () => {
  
  const [notification, dispatch] = useContext(NotificationContext)
  
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    visibility: 'hidden'
  }

  console.log(notification)

  return (
    <div style={notification.style}>
      {notification.message}
    </div>
  )
}

export default Notification

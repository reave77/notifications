import { useEffect, useReducer, useRef, useState } from 'react'
import './App.css'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

function getDateTimestamp(date) {
  return date.startsWith("#")
    ? Number(date.substring(1)) * 1000
    : (new Date(date)).getTime()
}

function App() {

  const [notifications, setNotifications] = useState(null)
  const isFetching = useRef(false);

  useEffect(() => {
    if (notifications === null && !isFetching.current) {
      isFetching.current = true;
      fetch("https://retoolapi.dev/02UE10/notifications")
        .then(response => response.json())
        .then(body => {
          const freshNotifications = body.filter(notification =>
            (Date.now() - getDateTimestamp(notification.date) < (1000 * 60 * 60 * 24 * 2)))
          setNotifications(freshNotifications.sort((a, b) => getDateTimestamp(b.date) - getDateTimestamp(a.date)))
          const oldNotifications = body.filter(n => !freshNotifications.includes(n))
          if (oldNotifications.length && freshNotifications.length) {
            const notificationToDelete = oldNotifications.pop();
            void fetch(`https://retoolapi.dev/02UE10/notifications/${notificationToDelete.id}`, {
              method: "DELETE"
            })
          }
        }).finally(() => { isFetching.current = false })
    }
  }, [notifications])

  return (
    <>
      {
        (notifications ?? []).map((notification, index) => <Card variant="outlined" key={index} sx={{ m: 3 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {new Date(getDateTimestamp(notification.date)).toLocaleDateString()} {new Date(getDateTimestamp(notification.date)).toLocaleTimeString()}
            </Typography>
            <Typography variant="h5" component="div">
              {notification.notification}
            </Typography>
          </CardContent>
        </Card>)
      }
    </>
  )
}

export default App

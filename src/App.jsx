import { useEffect, useState } from 'react'
import './App.css'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

function App() {

  const [notifications, setNotifications] = useState(null)

  useEffect(() => {
    if (notifications === null) fetch("http://localhost/notifications")
      .then(response => response.json())
      .then(body => setNotifications(body))
  }, [notifications])

  return (
    <>
      {
        (notifications ?? []).map((notification, index) => <Card variant="outlined" key={index} sx={{ m: 3 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {new Date(notification.date).toLocaleDateString()} {new Date(notification.date).toLocaleTimeString()}
            </Typography>
            <Typography variant="h5" component="div">
              {notification.message}
            </Typography>
          </CardContent>
        </Card>)
      }
    </>
  )
}

export default App

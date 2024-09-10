import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5002/api/activities')
      .then(response => {
        setActivities(response.data)
      })
  }, [])
  return (
    <div>
      <NavBar/>
      <Header as="h2" icon="users" content="Reactivities"></Header>
      <List>
        {activities.map((activity => (
          <List.Item key={activity.id}>
            {activity.title}
          </List.Item>
        )))}
      </List>
    </div>
  )
}
import { Header, List } from 'semantic-ui-react'
import { Activity } from '../Model/activity'
import NavBar from './NavBar'

export default App

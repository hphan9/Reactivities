import { useState, useEffect, Fragment } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'


function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  // when we are using states like this, it already knows what type of data we are storing in it because it's inferring it from its usage

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5002/api/activities')
      .then(response => {
        setActivities(response.data)
      })
  }, [])

  function handleSelectedActivity(id: string){
    setSelectedActivity(activities.find(x=>x.id === id))
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?:string){
    id ? handleSelectedActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop:'7em'}}>
      <Header as="h2" icon="users" content="Reactivities"></Header>
        <ActivityDashboard activities={activities} 
        selectedActivity = {selectedActivity}
        selectActivity ={handleSelectedActivity} 
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}/>
      </Container>
    </>
  )
}
import { Container, Header, List } from 'semantic-ui-react'
import { Activity } from '../Model/activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'

export default App

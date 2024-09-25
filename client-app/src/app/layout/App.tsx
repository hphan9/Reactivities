import { useState, useEffect } from 'react'
import {v4 as uuid} from 'uuid'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  // when we are using states like this, it already knows what type of data we are storing in it because it's inferring it from its usage

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
        let activities: Activity[] = [];
        response.forEach((activity: Activity) =>{
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        })
        setActivities(response)
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

  function handleCreateOrEditActivity(activity: Activity){
    activity.id ? setActivities([...activities.filter(x=>x.id != activity.id), activity])
                : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(activityId: string){
    setActivities([...activities.filter(x=>x.id != activityId)])
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
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity= {handleDeleteActivity}/>
      </Container>
    </>
  )
}
import { Container, Header, List } from 'semantic-ui-react'
import { Activity } from '../Model/activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import agent from '../api/agent';

export default App

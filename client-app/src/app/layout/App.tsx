import { useState, useEffect, act } from 'react'
import {v4 as uuid} from 'uuid'

function App() {
  const {activityStore} = useStore();

 
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  // when we are using states like this, it already knows what type of data we are storing in it because it's inferring it from its usage

  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([])
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  function handleCreateOrEditActivity(activity: Activity){
  setSubmitting(true);
   if(activity.id){
    agent.Activities.update(activity).then(()=>{
      setActivities([...activities.filter(x=>x.id !== activity.id), activity]);
      setEditMode(false);
      setSelectedActivity(activity);
      setSubmitting(false);
    })
   }else{
    activity.id = uuid();
    agent.Activities.create(activity).then(()=>{
      setActivities([...activities,activity]);
      setEditMode(false);
      setSelectedActivity(activity);
      setSubmitting(false);
    })
   }
  }

  function handleDeleteActivity(activityId: string){
    setSubmitting(true);
    agent.Activities.delete(activityId).then(()=>{
      setActivities([...activities.filter(x=>x.id != activityId)]);
      setSubmitting(false);
    })   
  }
  
  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>
  return (
    <>
      <NavBar/>
      <Container style={{marginTop:'7em'}}>
      <Header as="h2" icon="users" content="Reactivities"></Header>
        <ActivityDashboard activities={activityStore.activities} 
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity= {handleDeleteActivity}
        submitting={submitting}/>
      </Container>
    </>
  )
}
import { Button, Container, Header, List } from 'semantic-ui-react'
import { Activity } from '../Model/activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

export default observer(App)

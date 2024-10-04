import { useEffect } from 'react'
import { Container, Header } from 'semantic-ui-react'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();
  // when we are using states like this, it already knows what type of data we are storing in it because it's inferring it from its usage

  useEffect(() => {
    console.log("Render")
    activityStore.loadActivities();
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>
  return (
    <>
      <NavBar/>
      <Container style={{marginTop:'7em'}}>
      <Header as="h2" icon="users" content="Reactivities"></Header>
        <ActivityDashboard/>
      </Container>
    </>
  )
}

export default observer(App)

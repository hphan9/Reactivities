import { useEffect } from 'react'
import { Container, Header } from 'semantic-ui-react'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <NavBar/>
      <Container style={{marginTop:'7em'}}>
      <Header as="h2" icon="users" content="Reactivities"></Header>
        <Outlet />
      </Container>
    </>
  )
}

export default observer(App)

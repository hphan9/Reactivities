import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/Model/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stores/store';

interface Props{
    activities: Activity[],
    createOrEdit:(activity: Activity)=>void;
    deleteActivity:(id:string)=>void;
    submitting:boolean,
}
  
function ActivityDashboard({activities, createOrEdit, deleteActivity, submitting}:Props){
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;
    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities ={activities} deleteActivity={deleteActivity} submitting={submitting}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode && <ActivityDetails />}
                {editMode && <ActivityForm createOrEdit={createOrEdit} submitting ={submitting}/>}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard;


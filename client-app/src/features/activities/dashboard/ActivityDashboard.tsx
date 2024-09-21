import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../app/Model/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props{
    activities: Activity[],
    selectedActivity: Activity;
    selectActivity: (id:string)=> void;
    cancelSelectActivity:()=>void;
    editMode:boolean;
    openForm:(id:string)=>void;
    closeForm:() =>void;
}
  
export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelSelectActivity, openForm, closeForm, editMode}:Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails 
                activity={selectedActivity} 
                cancelSelectActivity={cancelSelectActivity}
                openForm={openForm}/>}
                {editMode && <ActivityForm closeForm={closeForm} activity={selectedActivity}/>}
            </Grid.Column>
        </Grid>
    )
}
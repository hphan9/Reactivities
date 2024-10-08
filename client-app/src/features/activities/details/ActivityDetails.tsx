import React from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Icon, Image } from "semantic-ui-react";
import { Activity } from "../../../app/Model/activity";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";

interface Props{
    selectedActivity: Activity
}

export default function ActivityDetails() {
    const {activityStore} = useStore();
    const { selectedActivity:activity, cancelSelectedActivity, openForm} = activityStore
    if(!activity) return; 
    return (
        <Card fluid>
            <Image src={`asset/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <CardContent>
                <CardHeader>{activity.title}</CardHeader>
                <CardMeta>
                    <span>{activity.date}</span>
                </CardMeta>
                <CardDescription>
                    {activity.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group width='2'>
                    <Button basic color='blue' content='Edit' onClick={()=>openForm(activity.id)}/>
                    <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel'/>
                </Button.Group>
            </CardContent>
        </Card>
    )
}
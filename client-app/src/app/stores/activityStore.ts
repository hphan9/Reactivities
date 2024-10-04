import { action, makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../Model/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid'

export default class ActivityStore {
    activityRegistry= new Map<string,Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = true;
    loadingInitial:boolean = true;
    submitting = false;

    constructor(){
        makeAutoObservable(this)
    }
    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () =>{
        try{
            const activities = await agent.Activities.list();

            activities.forEach((activity: Activity) =>{
                      activity.date = activity.date.split('T')[0];
                      runInAction(()=>this.activityRegistry.set(activity.id, activity));
                    }
                    );

            this.setloadingInitial(false);
        }catch(error){
            console.log(error);
            this.setloadingInitial(false);
        }
    }

   setloadingInitial = (state:boolean)=> this.loadingInitial = state;

   selectActivity = (id:string) =>{
    this.selectedActivity = this.activityRegistry.get(id);
   }

   cancelSelectedActivity = () =>{
    this.selectedActivity = undefined;
   }

   openForm = (id?:string) =>{
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
   }

   closeForm =()=>{
    this.editMode = false;
   }
   createOrEditActivity = async (activity: Activity) =>{
    this.submitting = true;
    try{
        if(activity.id){
            await agent.Activities.update(activity);      
        }else{
            activity.id = uuid();
            await agent.Activities.create(activity);   
        }
            runInAction(()=>{
                this.activityRegistry.set(activity.id, activity);
                this.editMode =false;
                this.selectedActivity = activity;
                this.submitting = false;
            })
    }catch(error){
        runInAction(()=>this.submitting = false)
        console.log(error);
    }
   }

   deleteActivity = async (id:string) =>{
    this.submitting = true;
    try{
        await agent.Activities.delete(id);
        runInAction(()=>{
            this.activityRegistry.delete(id);
            this.submitting = false;
        })
    }catch(error){
        console.log(error);
        runInAction(()=>this.submitting = false)
    }
   }
}
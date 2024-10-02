import { action, makeAutoObservable } from "mobx";
import { Activity } from "../Model/activity";
import agent from "../api/agent";


export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = true;
    loadingInitial:boolean = false

    constructor(){
        makeAutoObservable(this)
    }

    loadActivities = async () =>{
        this.setloadingInitial(true);
        try{
            const activities = await agent.Activities.list();
            activities.forEach((activity: Activity) =>{
                  activity.date = activity.date.split('T')[0];
                  this.activities.push(activity);
            })
            this.setloadingInitial(false);
        }catch(error){
            console.log(error);
            this.setloadingInitial(false);
        }
    }

   setloadingInitial = (state:boolean)=> this.loadingInitial = state;

   selectActivity = (id:string) =>{
    console.log(`select ${id} editmode ${this.editMode}`)
    this.selectedActivity = this.activities.find(x=>x.id === id);
    console.log(this.selectedActivity?.id)
   }

   cancelSelectedActivity = () =>{
    console.log(`cancel ${this.selectedActivity?.id}`)
    this.selectedActivity = undefined;
   }

   openForm = (id?:string) =>{
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
   }

   closeForm =()=>{
    this.editMode = false;
   }
}
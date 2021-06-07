import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { ActivatedRoute,Router,NavigationExtras} from '@angular/router';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Observable,of} from 'rxjs';
import {map,filter,startWith,tap,switchMap} from 'rxjs/operators';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';


//Importing Services
import {PlanetsService} from '../planets.service';
import {VehiclesService} from '../vehicles.service';
import {ValidationMessage} from '../validation-message';
import {ValidationMessageList} from '../MessageList';
import {FindingfalconeService} from '../findingfalcone.service';

//Importing Interfaces
import {Vehicles} from '../vehicles';
import {Planets} from '../planets';
import {Token} from '../token';
import {FindFalconRequest} from '../find-falcon-request';
import {Result} from '../result';


/**
   * Returns a Validator that handles Autocomplete Validation.
   * This validation handler helps in validating autocomplete on entering values.
   */
 function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
 }

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})


export class SearchComponent implements OnInit{
 // Destination1: FormControl=new FormControl();

    Destination1: FormControl=new FormControl('', 
      { validators: [autocompleteObjectValidator()] });
    Destination2: FormControl= new FormControl('', 
      { validators: [autocompleteObjectValidator(), Validators.required] });
    Destination3: FormControl= new FormControl('', 
      { validators: [autocompleteObjectValidator(), Validators.required] });
    Destination4: FormControl= new FormControl('', 
      { validators: [autocompleteObjectValidator(), Validators.required] });
  error={
    show:false,
    errorMessage:"Please Select all *Required Fields."
  };
  info={
    show:false,
    infoMessage:"Please Select all *Required Fields Again on Resetting Values."
  }
  
  filteredPlanets1: Observable<Planets[]>=of([]);
  filteredPlanets2: Observable<Planets[]>=of([]); 
  filteredPlanets3: Observable<Planets[]>=of([]);
  filteredPlanets4: Observable<Planets[]>=of([]);
  filteredVehicles1:Observable<Vehicles[]>=of([]); 
  filteredVehicles2: Observable<Vehicles[]>=of([]); 
  filteredVehicles3: Observable<Vehicles[]>=of([]); 
  filteredVehicles4: Observable<Vehicles[]>=of([]);

    searchForm = this.fb.group({
 
    selectedVehicle1: new FormControl(null,Validators.required),
    selectedVehicle2: new FormControl(null,Validators.required),
    selectedVehicle3: new FormControl(null,Validators.required),
    selectedVehicle4: new FormControl(null,Validators.required),
            
  });
   
   validationMessages=ValidationMessageList;
 

  Token: Token={} as Token;
  vehicle1: Vehicles={} as Vehicles;
  vehicle2: Vehicles={} as Vehicles;
  vehicle3: Vehicles={} as Vehicles;
  vehicle4: Vehicles={} as Vehicles;
  planet1: Planets={} as Planets;
  planet2: Planets={} as Planets;
  planet3: Planets={} as Planets;
  planet4: Planets={} as Planets;
  result:Result={} as Result;
  timeTaken=0;
  Planets: Planets[]=[];
  Vehicles: Vehicles[]=[];
 
  showVehicle1:  boolean=true;
  showVehicle2:  boolean=true;
  showVehicle3:  boolean=true;
  showVehicle4:  boolean=true;
  showPlanet2:  boolean=false;
  showPlanet3:  boolean=false;
  showPlanet4:  boolean=false;
  selectedPlanets: string[]=[];
  selectedVehicles:  string[]=[];
  filteredlist1:Vehicles[]=[];
  filteredlist2:Vehicles[]=[];
  filteredlist3:Vehicles[]=[];
  filteredlist4:Vehicles[]=[];
  filteredPlanetlist1:Planets[]=[];
  filteredPlanetlist2:Planets[]=[];
  filteredPlanetlist3:Planets[]=[];
  filteredPlanetlist4:Planets[]=[];
  
  PlanetList:Planets[]=[];
  stage=1;

  constructor(private fb: FormBuilder,
              private router: Router,
              private planetsService: PlanetsService,
              private vehicleService: VehiclesService,
              private FindingfalconeService: FindingfalconeService

              ) { }

ngOnInit() {

      this.getPlanets();
      this.getVehicles();
      } 


/**
   * Returns a list of planet that is filtered according to the user input.
   * This filter helps in filtering autocomplete on entering values.
   */
 filterPlanets(pName: any,initial:true,destination:number):void {
    
    switch(destination){
      case 1:
      {let filtered:any=[];
       if(pName=="")
       {
         filtered=this.filteredPlanetlist1;
       }
       else{
         filtered= this.filteredPlanetlist1.filter(planet =>
         planet.name.toLowerCase().indexOf(pName.toLowerCase()) === 0);
         
       }
       this.filteredPlanets1=of(filtered);
      break;
      }
      case 2:
      {let filtered:any=[];
       if(pName=="")
       {
         filtered=this.filteredPlanetlist2;
       }
       else{
         filtered= this.filteredPlanetlist2.filter(planet =>
         planet.name.toLowerCase().indexOf(pName.toLowerCase()) === 0);
         
       }
       this.filteredPlanets2=of(filtered);
      break;
      }
      case 3:
      {let filtered:any=[];
       if(pName=="")
       {
         filtered=this.filteredPlanetlist3;
       }
       else
       {
         filtered= this.filteredPlanetlist3.filter(planet =>
         planet.name.toLowerCase().indexOf(pName.toLowerCase()) === 0);
         
       }
       this.filteredPlanets3=of(filtered);
      break;
      }
      case 4:
      {let filtered:any=[];
       if(pName=="")
       {
         filtered=this.filteredPlanetlist4;
       }
       else{
         filtered= this.filteredPlanetlist4.filter(planet =>
         planet.name.toLowerCase().indexOf(pName.toLowerCase()) === 0);
         
       }
       this.filteredPlanets4=of(filtered);
      break;
      }
    }
    
 }
  

  /**
   * Assigns a list of planet fetched from service to autocomplete lists.
   * This function helps in fetching Planets from Service and assigns them to Autocomplete objects for further processing
   */
  getPlanets(): void
  {

    this.planetsService.getList()
      .subscribe(Planets=>{this.Planets=Planets;
        //deep copying fetched data for further processing
        this.PlanetList=JSON.parse(JSON.stringify(Planets));
        this.Planets=JSON.parse(JSON.stringify(Planets));
        this.filteredPlanets1=of(Planets);
        this.filteredPlanetlist1=JSON.parse(JSON.stringify(Planets));
        this.filteredPlanetlist2=JSON.parse(JSON.stringify(Planets));
        this.filteredPlanetlist3=JSON.parse(JSON.stringify(Planets));
        this.filteredPlanetlist4=JSON.parse(JSON.stringify(Planets));
       });
   }

/**
   * Triggered when a Planet is selected by User
   * This function is used for step by step processing once planets are selected
   * @param destination - name of the destination that has been selected
   * @param selectedPlanet - Planet Object that has been selected
   */
  onSelectingPlanet(destination:string,  selectedPlanet:Planets, event:any):void{
           if(this.error.show) // Checking whether error message is displayed
             this.error.show=false;
           if(this.info.show) // Checking whether info message is displayed
             this.info.show=false;
      
    switch (destination) {
   
      case "dest1":{
        // code when first destination is selected...
        if(event.isUserInput)
        {
                  
          if(this.stage>1 ||(this.planet1.name||this.vehicle1.name))// Checking whether Resetting needs to be done
          {
          if(this.vehicle1.name)
          this.ShowInfo();// displaying info message
          this.onReset(1); //Resetting

          this.removeSelectedPlanet(selectedPlanet,1); //Removing selected planet1 from all other autocompletes
          this.filterVehicles(1,selectedPlanet); //Filtering vehicles according to planet distance
          //this.planet1=selectedPlanet;
          }
          else
          {

           this.removeSelectedPlanet(selectedPlanet,1);  //Removing selected planet1 from all other autocompletes
           this.filterVehicles(1,selectedPlanet); //Filtering vehicles according to planet1 distance
    
          }
          this.showVehicle1=  false; //for displaying vehicle1 options  
          
      }

          break;
    }
      case "dest2":
       // code when second destination is selected...
       {
       if(event.isUserInput)
        {
          this.showVehicle2=  false;//for displaying vehicle2 options  

          if(this.stage>2&&this.planet3.name)// Checking whether Resetting needs to be done
          {
          this.onReset(2); //Resetting
          this.removeSelectedPlanet(this.planet1,1);//Removing selected planet1 from all other autocompletes
          this.removeSelectedPlanet(selectedPlanet,2)//Removing selected planet2 from all other autocompletes
          this.filterVehicles(1,this.planet1);//Filtering vehicles according to planet1 distance
          this.filterVehicles(2,selectedPlanet);//Filtering vehicles according to planet2 distance
          }
          else
          {
            if(this.stage<2&&!this.planet2.name&&!this.vehicle2.name)//Checking whether all inputs are proper
            {
              this.removeSelectedPlanet(selectedPlanet,2);//Removing selected planet2 from all other autocompletes
              this.filterVehicles(2,selectedPlanet);//Filtering vehicles according to planet2 distance
              this.stage=2; //Stage 2 started
            }
          }
        }
         break;
       }
      case "dest3":
      // code when third destination is selected...
        {
       if(event.isUserInput)
        {
          this.showVehicle3=  false;//for displaying vehicle3 options 

          if(this.stage>=3&&(this.planet4.name))// Checking whether Resetting needs to be done
          {
          this.onReset(3); //Resetting
          this.removeSelectedPlanet(this.planet1,1);//Removing selected planet1 from all other autocompletes
          this.removeSelectedPlanet(this.planet2,2);//Removing selected planet2 from all other autocompletes
          this.removeSelectedPlanet(selectedPlanet,3);//Removing selected planet3 from all other autocompletes
          this.filterVehicles(1,this.planet1);//Filtering vehicles according to planet1 distance
          this.filterVehicles(2,this.planet2);//Filtering vehicles according to planet2 distance          
          this.filterVehicles(3,selectedPlanet);//Filtering vehicles according to planet3 distance
          }
          else
          {                          
              this.removeSelectedPlanet(selectedPlanet,3);//Removing selected planet3 from all other autocompletes
              this.filterVehicles(3,selectedPlanet);//Filtering vehicles according to planet3 distance
              this.stage=3;//Stage 3 started
           
          }
        }
        
          break;
        }
      case "dest4":
      // code when fourth destination is selected...

        {
          this.showVehicle4=  false; //for displaying vehicle4 options 
          this.filterVehicles(4,selectedPlanet);//Filtering vehicles according to planet4 distance
          break;
        }
      default:
        // code for default case...
       {
        this.showVehicle1=  true;
        this.showVehicle2=  true;
        this.showVehicle3=  true;
        this.showVehicle4=  true;
        break;
      }
    }
        
   }

 /**
   * Assigns a list of vehicles fetched from service to radio group lists.
   * This function helps in fetching vehicles from Service and assigns them to radio group objects for further processing
   */
  getVehicles():void
  {
     this.vehicleService.getList().subscribe(
       data=>{

        //deep copying fetched data for further processing
         this.Vehicles=JSON.parse(JSON.stringify(data));
         this.filteredlist4=JSON.parse(JSON.stringify(data));
         this.filteredlist3=JSON.parse(JSON.stringify(data));
         this.filteredlist2=JSON.parse(JSON.stringify(data));
         this.filteredlist1=JSON.parse(JSON.stringify(data));
       }
         );
      
   }
/**
   * Returns Filtered Vehicle List According to Distance of Selected Planet
   * This function is used for filtering Vehicle List once planet is selected
   * @param vehicles - Vehicle array
   * @param selectedPlanet - Planet Object that has been selected
   */
   filterAccordingToDistance(vehicles:Vehicles[],selectedPlanet:Planets):Vehicles[]
   {

     //for(let vehicle of vehicles)
       for (var i=vehicles.length-1; i >= 0; i--)
       {
         if(vehicles[i].max_distance<selectedPlanet.distance)
         {
           vehicles.splice(i,1);
         }
       }
     
       return vehicles;

   }
 

/**
   * This function is used for updating Vehicles List once a vehicle has been selected
   * @param vehicleNumber - denotes which vehicle has been selected
   */
filterVehicleUnits(vehicleNumber:number):void{

  switch (vehicleNumber) {
    case 1:
      // code when first vehicle has been selected
      { 
        for(let value of this.filteredlist2)// Filtering Second Vehicle List
       {
         if(value.name===this.vehicle1.name)
         {
         if(value.total_no>1)
         {
           value.total_no=value.total_no-1;
         }
         else
           {
            this.filteredlist2.splice(this.filteredlist2.indexOf(value),1);
           }
         }
       }

       for(let value of this.filteredlist3)// Filtering 3rd Vehicle List
       {
         if(value.name===this.vehicle1.name)
         {
         if(value.total_no>1)
         {
           value.total_no=value.total_no-1;
         }
         else
           {
            this.filteredlist3.splice(this.filteredlist3.indexOf(value),1);
           }
         }
       }

       for(let value of this.filteredlist4)// Filtering 4th Vehicle List
       {
         if(value.name===this.vehicle1.name)
         {
         if(value.total_no>1)
         {
           value.total_no=value.total_no-1;
         }
         else
           {
            this.filteredlist4.splice(this.filteredlist4.indexOf(value),1);
           }
         }
       }
        //Assigning Filtered Lists to Respective Radio Groups
        this.filteredVehicles2=of(this.filteredlist2);
        this.filteredVehicles3=of(this.filteredlist3);
        this.filteredVehicles4=of(this.filteredlist4);
      break;
      }

      case 2:
     // code when 2nd vehicle has been selected
      {
       for(let value of this.filteredlist3)// Filtering 3rd Vehicle List
       {
         if(value.name===this.vehicle2.name)
         {
         if(value.total_no>1)
         {
           value.total_no=value.total_no-1;
         }
         else
           {
            this.filteredlist3.splice(this.filteredlist3.indexOf(value),1);
           }
         }
       }

       for(let value of this.filteredlist4)// Filtering 4th Vehicle List
       {
         if(value.name===this.vehicle2.name)
         {
         if(value.total_no>1)
         {
           value.total_no=value.total_no-1;
         }
         else
           {
            this.filteredlist4.splice(this.filteredlist4.indexOf(value),1);
           }
         }
       }
       //Assigning Filtered Lists to Respective Radio Groups
        this.filteredVehicles3=of(this.filteredlist3);
        this.filteredVehicles4=of(this.filteredlist4);
      break;
    }

      case 3:
         // code when 3rd vehicle has been selected
       {
       for(let value of this.filteredlist4)// Filtering 4th Vehicle List
       {
         if(value.name===this.vehicle3.name)
         {
         if(value.total_no>1)
         {
           value.total_no=value.total_no-1;
         }
         else
           {
            this.filteredlist4.splice(this.filteredlist4.indexOf(value),1);
           }
         }
       }
       //Assigning Filtered Lists to Respective Radio Groups
        this.filteredVehicles4=of(this.filteredlist4);
      break;}
    default:
      // code...
      break;
  }

     

}


/**
   * This function is used for updating Vehicles List once a planet has been selected
   * @param count - denotes which planet has been selected
   * @param selectedPlanet - Planet Object that has been selected
   */
  filterVehicles(count:number,selectedPlanet:Planets):void
  {


    switch (count) {
      case 1:
        // code when 1st planet has been selected...
        {
        this.filteredlist1=this.filterAccordingToDistance(this.filteredlist1,selectedPlanet);
        this.filteredVehicles1=of(this.filteredlist1);
        break;
        }
       case 2:
         // code when 2nd planet has been selected...
        {
        this.filteredlist2=this.filterAccordingToDistance(this.filteredlist2,selectedPlanet);
        this.filteredVehicles2=of(this.filteredlist2);
        break;
        }
        case 3:
        // code when 3rd planet has been selected...
        {
        this.filteredlist3=this.filterAccordingToDistance(this.filteredlist3,selectedPlanet);
        this.filteredVehicles3=of(this.filteredlist3);
        break;
        }
        case 4:
        // code when 4th planet has been selected...
        {
        this.filteredlist4=this.filterAccordingToDistance(this.filteredlist4,selectedPlanet);
        this.filteredVehicles4=of(this.filteredlist4);
        break;
        }
      default:
        // code...
        break;
    }

    
  }

/**
   * This function is used for updating Planets List once all planets are selected
   */
  addSelectedPlanet():void
  {  
       if(this.planet1.name&&this.planet2.name&&this.planet3.name&&this.planet4.name)
       {
        this.selectedPlanets.push(this.planet1.name.toString());
        this.selectedPlanets.push(this.planet2.name.toString());
        this.selectedPlanets.push(this.planet3.name.toString());
        this.selectedPlanets.push(this.planet4.name.toString());
        this.error.show=false;
      }
      else{
        this.ShowError();// show error message if all planets are not selected
      }
  }

/**
   * This function is used for updating Vehicles List once all planets are selected
   */
  addSelectedVehicles():void
  {
       if(this.vehicle1.name&&this.vehicle2.name&&this.vehicle3.name&&this.vehicle4.name)
       {
        this.selectedVehicles.push(this.vehicle1.name.toString());
        this.selectedVehicles.push(this.vehicle2.name.toString());
        this.selectedVehicles.push(this.vehicle3.name.toString());
        this.selectedVehicles.push(this.vehicle4.name.toString());
         this.error.show=false;
       }
       else
       {
         this.ShowError();// show error message if all vehicles are not selected
       }
  }


  /**
  * Function to calculate time taken
  * time=distance/speed
  * @params vehicle: selected vehicle
  * @params planet: selected planet
  */
  calculateTimeTaken(vehicle:Vehicles,planet:Planets):void
  {
    if(vehicle.speed&&planet.distance)
  {
    let time=planet.distance/vehicle.speed;
    this.timeTaken=this.timeTaken+time;
  }
  else
  {
    this.ShowError();//ShowError if input is not valid
  }

  }


  /**
  * Function for further processing when a vehicle is selected
  * @params option: selected vehicle number
  * @params vehicle: selected vehicle
  */
  onSelectingVehicle(option: number,vehicle:Vehicles):void{
     if(this.error.show)//Checking whether error message is displayed
         this.error.show=false;
     if(this.info.show)//Checking whether error message is displayed
         this.info.show=false;

     let time:number= 0;
     switch (option) {
       case 1:
         // code when 1st vehicle has been selected...
         {if(this.vehicle1.name)
         {
           
           if(this.showPlanet2)// Checking whether reset should be done
             {
               this.onReset(1);// Resetting
               this.removeSelectedPlanet(this.planet1,1);// filtering planet1 from other autocompletes
               this.vehicle1=vehicle;//reassigning value to vehicle1 radio group
            }      

           this.calculateTimeTaken(vehicle,this.planet1);//Calculating time taken
           this.filterVehicleUnits(1);//Filtering vehicles lists according to selected vehicle1
          
           this.showPlanet2=true;//displaying second planet
           }
         
         break;
       }
       case 2:
         // code when 2nd vehicle has been selected...
         {
           if(this.vehicle2.name)
           {
              
             if(this.showPlanet3)// Checking whether reset should be done
             {
               let vehicle1=this.vehicle1;
               this.onReset(2);// Resetting
               this.vehicle1=vehicle1;//reassigning value to vehicle1 radio group
               this.vehicle2=vehicle;//reassigning value to vehicle2 radio group
               this.removeSelectedPlanet(this.planet1,1);// filtering planet1 from other autocompletes
               this.removeSelectedPlanet(this.planet2,2);// filtering planet1 from other autocompletes
               this.filterVehicles(1,this.planet1);//Filtering vehicles lists according to vehicle1
              } 
             this.calculateTimeTaken(vehicle,this.planet2);//Calculating time taken
             
             this.filterVehicleUnits(2);//Filtering vehicles lists according to selected vehicle2
             this.showPlanet3=true;//displaying 3rd planet
         }
         break;}
       case 3:
         // code when 3rd vehicle has been selected...
         {if(this.vehicle3.name)
         {
           if(this.showPlanet4)// Checking whether reset should be done
             {
               let vehicle1=this.vehicle1;
               let vehicle2=this.vehicle2;
               this.onReset(3);// Resetting
               this.vehicle1=vehicle1;//reassigning value to vehicle1 radio group
               this.vehicle2=vehicle2;//reassigning value to vehicle2 radio group               
               this.vehicle3=vehicle;//reassigning value to vehicle3 radio group 
               this.removeSelectedPlanet(this.planet1,1);// filtering planet1 from other autocompletes
               this.removeSelectedPlanet(this.planet2,2);// filtering planet2 from other autocompletes
               this.removeSelectedPlanet(this.planet3,3);// filtering planet3 from other autocompletes
               this.filterVehicles(1,this.planet1);//Filtering vehicles lists according to vehicle1
               this.filterVehicles(2,this.planet2);//Filtering vehicles lists according to vehicle1
              } 

           this.calculateTimeTaken(vehicle,this.planet3);//Calculating time taken
           this.filterVehicleUnits(3);//Filtering vehicles lists according to selected vehicle3
           this.showPlanet4=true;//displaying 4th planet
         }
         break;}
       case 4:
           // code when 4th vehicle has been selected...
        {if(this.vehicle4.name)
         {

           this.calculateTimeTaken(vehicle,this.planet4);//Calculating time taken
         }
         break;
       }
       
       default:
         // code...
         this.timeTaken=0;
         break;
     }
   
  }

/**
*Function to display planet name in autocomplete
*returns planet name for display in autocomplete
*/
 getSelectedPlanetText(planet:Planets) {
     return planet ? planet.name :'';
   }

   getSelectedVehicleText(vehicle:Vehicles){
    let text=vehicle.name.toString();
  
    text.concat(vehicle.total_no.toString());
    return text;
   }


/**
  * Function to remove already selected planets from other autocomplete lists
  * @params selectedPlanet: selected planet
  * @params destinationNumber: number denoting which destination has been selected
    */
removeSelectedPlanet(selectedPlanet:Planets, destinationNumber:Number){

switch (destinationNumber) {
  case 1:
    // code when 1st planet has been selected ...
    {
      //Filtering Planet Lists
      let eIndex=this.filteredPlanetlist2.findIndex(element=>(element.name===selectedPlanet.name));
      if(eIndex>=0)
    this.filteredPlanetlist2.splice(eIndex,1);

    eIndex=this.filteredPlanetlist3.findIndex(element=>(element.name===selectedPlanet.name));
    if(eIndex>=0)
    this.filteredPlanetlist3.splice(eIndex,1);

    eIndex=this.filteredPlanetlist4.findIndex(element=>(element.name===selectedPlanet.name));
    if(eIndex>=0)
    this.filteredPlanetlist4.splice(eIndex,1);
    //Assigning filtered lists to autocomplete 
    this.filteredPlanets2=of(this.filteredPlanetlist2);
    this.filteredPlanets3=of(this.filteredPlanetlist3);
    this.filteredPlanets4=of(this.filteredPlanetlist4);
    break;}

   case 2:
      // code when 2nd planet has been selected ...
    {
       //Filtering Planet Lists
      let eIndex=this.filteredPlanetlist3.findIndex(element=>(element.name===selectedPlanet.name));
    if(eIndex>=0)
    this.filteredPlanetlist3.splice(eIndex,1);

    eIndex=this.filteredPlanetlist4.findIndex(element=>(element.name===selectedPlanet.name));
    if(eIndex>=0)
    this.filteredPlanetlist4.splice(eIndex,1);

    
    //Assigning filtered lists to autocomplete 
    this.filteredPlanets3=of(this.filteredPlanetlist3);
    this.filteredPlanets4=of(this.filteredPlanetlist4);
    break;}

  case 3:
     // code when 3rd planet has been selected ...
   {  
    let eIndex=this.filteredPlanetlist4.findIndex(element=>(element.name===selectedPlanet.name));
    if(eIndex>=0)
      //Assigning filtered list to autocomplete 
    this.filteredPlanetlist4.splice(eIndex,1);
    break;}
  
  default:
    // code...
    break;
}
}  


/**
  * Function to get token from server
*/
   SearchFalcon(): void
  {

    this.FindingfalconeService.findingFalconToken()
    .subscribe(Token=>{this.Token=Token;
       this.findFalcon(this.Token);
       });

   }
 
/**
  * Function to find Falcon
  * @params token: token fetched from server
    */
findFalcon(token:Token ):void{
 let FindFalconRequest:FindFalconRequest={
   token:token.token,
   planet_names:this.selectedPlanets,
   vehicle_names:this.selectedVehicles
 };

 //Routing to result page once searching is done
 this.FindingfalconeService.findFalcon(FindFalconRequest,this.timeTaken)
    .subscribe(data=>{
      this.result=data;
      this.router.navigateByUrl("result");
    });
}
   
/**
  * Function to enable search functionality
    */
  onSubmit(): void {
    if(this.searchForm.valid)
    {
    this.addSelectedPlanet();// Adding all selected planets to parameter list
    this.addSelectedVehicles();// Adding all selected vehicles to parameter list
    if(!this.error.show)
     {
      this.SearchFalcon();// Searching done for falcon falcon 

     }
    }
    else
    {
      this.ShowError();//displays error message if all input values are not proper
    }
  }

   
/**
  * Function to display error message
    */
  ShowError():void{
     this.error.show=true;
   }
   
/**
  * Function to display info message
    */
   ShowInfo():void{
     this.info.show=true;
   }

/**
  * Function to reset page
  * @params stage: stage of form input
    */
onReset(stage:Number):void{
  this.ShowInfo();// displaying info message
  switch (stage) {
    case 1:
    //code when 1st planet or vehicle has been reset
    {
      //Resetting all input values and variables
      this.stage=1;
      this.vehicle1={} as Vehicles;
      this.vehicle2={} as Vehicles;
      this.vehicle3={} as Vehicles;
      this.vehicle4={} as Vehicles;
      this.filteredVehicles1=of(this.Vehicles);
      this.filteredlist1=JSON.parse(JSON.stringify(this.Vehicles));
      this.filteredlist2=JSON.parse(JSON.stringify(this.Vehicles));
      this.filteredlist3=JSON.parse(JSON.stringify(this.Vehicles));
      this.filteredlist4=JSON.parse(JSON.stringify(this.Vehicles));
      this.planet2={} as Planets;
      this.planet3={} as Planets;
      this.planet4={} as Planets;
      this.filteredPlanetlist2=JSON.parse(JSON.stringify(this.PlanetList));    
      this.filteredPlanetlist3=JSON.parse(JSON.stringify(this.PlanetList));  
      this.filteredPlanetlist4=JSON.parse(JSON.stringify(this.PlanetList));
      this.showVehicle2=true;
      this.showVehicle3=true;
      this.showVehicle4=true;
      this.showPlanet2=false;
      this.showPlanet3=false;
      this.showPlanet4=false; 
      this.timeTaken=0;
      this.error.show=false;
      break;
    }
    case 2:
    //code when 2nd planet or vehicle has been reset
    { 
        this.ShowInfo();// displaying info message
      //Resetting all input values and variables
      this.stage=2;
      this.vehicle2={} as Vehicles;
      this.vehicle3={} as Vehicles;
      this.vehicle4={} as Vehicles;
      this.filteredlist2=JSON.parse(JSON.stringify(this.Vehicles));
      this.filteredlist3=JSON.parse(JSON.stringify(this.Vehicles));
      this.filteredlist4=JSON.parse(JSON.stringify(this.Vehicles));
      this.planet3={} as Planets;
      this.planet4={} as Planets;
      this.filteredPlanetlist3=JSON.parse(JSON.stringify(this.PlanetList));  
      this.filteredPlanetlist4=JSON.parse(JSON.stringify(this.PlanetList));
      this.showVehicle3=true;
      this.showVehicle4=true;
      this.showPlanet3=false;
      this.showPlanet4=false;
      this.timeTaken=0;
      this.calculateTimeTaken(this.vehicle1,this.planet1);
      this.error.show=false;
      break;
    }
    case 3:
    //code when 3rd planet or vehicle has been reset
    {
        this.ShowInfo();// displaying info message
      //Resetting all input values and variables
      this.stage=3;
      this.vehicle3={} as Vehicles;
      this.vehicle4={} as Vehicles;
      this.filteredlist3=JSON.parse(JSON.stringify(this.Vehicles));
      this.filteredlist4=JSON.parse(JSON.stringify(this.Vehicles));
      this.planet4={} as Planets;  
      this.filteredPlanetlist4=JSON.parse(JSON.stringify(this.PlanetList));
      this.showVehicle4=true;
      this.showPlanet4=false;
      this.timeTaken=0;
      this.calculateTimeTaken(this.vehicle1,this.planet1);
      this.calculateTimeTaken(this.vehicle2,this.planet3);
      this.error.show=false;
      break;
    }

    case 4:
      // code when user clicks Reseet Button
      {
       //Resetting all input values and variables
      this.searchForm.reset;
      this.filteredPlanets1=of(this.PlanetList);
      this.filteredPlanetlist1=JSON.parse(JSON.stringify(this.PlanetList));
      this.filteredPlanetlist2=JSON.parse(JSON.stringify(this.PlanetList));
      this.filteredPlanetlist3=JSON.parse(JSON.stringify(this.PlanetList));
      this.filteredPlanetlist4=JSON.parse(JSON.stringify(this.PlanetList));
      this.filteredVehicles1=of(this.Vehicles); 
      this.stage=1;    
      this.showVehicle2=true;
      this.showVehicle3=true;
      this.showVehicle4=true;
      this.showPlanet2=false;
      this.showPlanet3=false;
      this.showPlanet4=false; 
      this.filteredlist1=JSON.parse(JSON.stringify(this.Vehicles));
      this.filteredlist2=JSON.parse(JSON.stringify(this.Vehicles));
      this.filteredlist3=JSON.parse(JSON.stringify(this.Vehicles));
      this.filteredlist4=JSON.parse(JSON.stringify(this.Vehicles));
      this.vehicle1={} as Vehicles;
      this.vehicle2={} as Vehicles;
      this.vehicle3={} as Vehicles;
      this.vehicle4={} as Vehicles;
      this.planet1={} as Planets;
      this.planet2={} as Planets;
      this.planet3={} as Planets;
      this.planet4={} as Planets;
      this.timeTaken=0;
      this.error.show=false;
      break;
    }

    default:
      // code...
      break;
  }

}

}

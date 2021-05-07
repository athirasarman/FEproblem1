import { Component, OnInit, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { FormBuilder, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { ActivatedRoute,Router} from '@angular/router';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Observable,of} from 'rxjs';
import {map,filter,startWith,tap,switchMap} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent}from '@angular/material/autocomplete';
import {MatAutocompleteActivatedEvent}from '@angular/material/autocomplete';
import {FindingfalconeService} from '../findingfalcone.service';
import {MatRadioChange } from '@angular/material/radio';


//Importing Services
import {PlanetsService} from '../planets.service';
import {VehiclesService} from '../vehicles.service';
import {ValidationMessage} from '../validation-message';
import {ValidationMessageList} from '../MessageList';

//Importing Interfaces
import {Vehicles} from '../vehicles';
import {Planets} from '../planets';
import {Token} from '../token';
import {FindFalconRequest} from '../find-falcon-request';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit{
  
  filteredPlanets1: Observable<Planets[]>;
  filteredPlanets2: Observable<Planets[]>; 
  filteredPlanets3: Observable<Planets[]>; 
  filteredPlanets4: Observable<Planets[]>; 
  filteredVehicles1:Observable<Vehicles[]>; 
  filteredVehicles2: Observable<Vehicles[]>; 
  filteredVehicles3: Observable<Vehicles[]>; 
  filteredVehicles4: Observable<Vehicles[]>; 

    searchForm = this.fb.group({
 
    selectedVehicle1: new FormControl(null,Validators.required),
    selectedVehicle2: new FormControl(null,Validators.required),
    selectedVehicle3: new FormControl(null,Validators.required),
    selectedVehicle4: new FormControl(null,Validators.required),
            
  });
   
   validationMessages=ValidationMessageList;
    Destination1: FormControl=new FormControl('', 
      { validators: [this.autocompleteObjectValidator(), Validators.required] });
    Destination2: FormControl= new FormControl('', 
      { validators: [this.autocompleteObjectValidator(), Validators.required] });
    Destination3: FormControl= new FormControl('', 
      { validators: [this.autocompleteObjectValidator(), Validators.required] });
    Destination4: FormControl= new FormControl('', 
      { validators: [this.autocompleteObjectValidator(), Validators.required] });

  Token: Token={} as Token;
  vehicle1: Vehicles={} as Vehicles;
  vehicle2: Vehicles={} as Vehicles;
  vehicle3: Vehicles={} as Vehicles;
  vehicle4: Vehicles={} as Vehicles;
  planet1: Planets={} as Planets;
  planet2: Planets={} as Planets;
  planet3: Planets={} as Planets;
  planet4: Planets={} as Planets;
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
              private route: ActivatedRoute,
              private router: Router,
              private planetsService: PlanetsService,
              private vehicleService: VehiclesService,
              private FindingfalconeService: FindingfalconeService

              ) {
             
              this.getPlanets();
              this.getVehicles();
  }

ngOnInit() {
          
      this.filteredPlanets1 = this.Destination1.valueChanges
      .pipe(
        startWith(null),
        map(planet => planet ? this.filterPlanets(planet,true) : this.Planets.slice())
      );
      this.filteredPlanets2 = this.Destination2.valueChanges
      .pipe(
        startWith(null),
        map(planet => planet ? this.filterPlanets(planet,true) : this.Planets.slice())
      );
       this.filteredPlanets3 = this.Destination3.valueChanges
      .pipe(
        startWith(null),
        map(planet => planet ? this.filterPlanets(planet,true) : this.Planets.slice())
      );
       this.filteredPlanets4 = this.Destination4.valueChanges
      .pipe(
        startWith(null),
        map(planet => planet ? this.filterPlanets(planet,true) : this.Planets.slice())
      );
  
    } 

  autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
 }

//Function to filter planets
 filterPlanets(pName: any,initial:true) {
     let planetName = "";
    if(pName){
    // pName can be a planet or a string
     let planetName = pName.name || pName;
    }
    
    return this.Planets.filter(planet =>
      planet.name.toLowerCase().indexOf(planetName.toLowerCase()) === 0);

  }
  

  //Function to get planets from server
  getPlanets(): void
  {

    this.planetsService.getPlanets()
      .subscribe(Planets=>{this.Planets=Planets;
        this.PlanetList=JSON.parse(JSON.stringify(Planets));
        this.filteredPlanets1=of(this.Planets);
        this.filteredPlanetlist1=JSON.parse(JSON.stringify(Planets));
        this.filteredPlanetlist2=JSON.parse(JSON.stringify(Planets));
        this.filteredPlanetlist3=JSON.parse(JSON.stringify(Planets));
        this.filteredPlanetlist4=JSON.parse(JSON.stringify(Planets));

       });
   }

  onSelectingPlanet(destination:string,  selectedPlanet:Planets):void{
      
    switch (destination) {
      case "dest1":
        // code...
        {
          this.showVehicle1=  false;
          if(this.stage>1)
          {
          this.onReset(1);
          this.removeSelectedPlanet(selectedPlanet,1);
          this.filterVehicles(1,selectedPlanet);
          }
          else
          {
          if(!this.planet1.name&&!this.vehicle1.name)
           {
           this.removeSelectedPlanet(selectedPlanet,1);
           this.filterVehicles(1,selectedPlanet);
           //this.stage=2;
          }
          }
          
          break;
      }
      case "dest2":
        {
          this.showVehicle2=  false;
          if(this.stage>2&&this.planet3.name)
          {
          this.onReset(2);
          this.removeSelectedPlanet(this.planet1,1);
          this.removeSelectedPlanet(selectedPlanet,2);
          this.filterVehicles(1,this.planet1);
          this.filterVehicles(2,selectedPlanet);
          }
          else
          {
            if(this.stage<2&&!this.planet2.name&&!this.vehicle2.name)
            {
              this.removeSelectedPlanet(selectedPlanet,2);
              this.filterVehicles(2,selectedPlanet);
              this.stage=2;
            }
          }
          
          break;
        }
      case "dest3":
        {
          this.showVehicle3=  false;
          if(this.stage>=3&&(this.planet4.name))
          {
          this.onReset(3);
          console.log(this.planet3);
          console.log(this.planet4);
          console.log(this.vehicle3);
          console.log(this.vehicle4);
          this.removeSelectedPlanet(this.planet1,1);
          this.removeSelectedPlanet(this.planet2,2);
        // if(!this.planet4.name&&this.stage==3)
          //{
           this.removeSelectedPlanet(selectedPlanet,3);
           this.filterVehicles(3,selectedPlanet);
         // }
          /*else
          {
            this.removeSelectedPlanet(this.planet3,3);
            this.filterVehicles(3,this.planet3);
          }*/

          this.filterVehicles(1,this.planet1);
          this.filterVehicles(2,this.planet2);
          //this.filterVehicles(3,selectedPlanet);
          }
          else
          {
            if(this.stage<3)
            {
              
              this.removeSelectedPlanet(selectedPlanet,3);
              this.filterVehicles(3,selectedPlanet);
              this.stage=3;
            }
          }
        
          break;
        }
      case "dest4":
        {
          this.showVehicle4=  false;
          this.filterVehicles(4,selectedPlanet);
          break;}
      default:
        // code...
       {
        this.showVehicle1=  true;
        this.showVehicle2=  true;
        this.showVehicle3=  true;
        this.showVehicle4=  true;
        break;
      }
    }
        
   }

 //Function to get vehicles from server
  getVehicles():void
  {
     this.vehicleService.getVehicles().subscribe(
       data=>{
         this.Vehicles=JSON.parse(JSON.stringify(data));
         this.filteredlist4=JSON.parse(JSON.stringify(data));
         this.filteredlist3=JSON.parse(JSON.stringify(data));
         this.filteredlist2=JSON.parse(JSON.stringify(data));
         this.filteredlist1=JSON.parse(JSON.stringify(data));
       }
         );
      
   }

  //Function to filter Vehicles according to distance
   filterAccordingToDistance(vehicles:Vehicles[],selectedPlanet:Planets):Vehicles[]
   {

     for(let vehicle of vehicles)
       {
         if(vehicle.max_distance<selectedPlanet.distance)
         {
           vehicles.splice(vehicles.indexOf(vehicle),1);
         }
       }
     
       return vehicles;

   }
 

//Function to filter vehicle units
filterVehicleUnits(vehicleNumber:number):void{

  switch (vehicleNumber) {
    case 1:
      // code...
       for(let value of this.filteredlist2)
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

       for(let value of this.filteredlist3)
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

       for(let value of this.filteredlist4)
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

        this.filteredVehicles2=of(this.filteredlist2);
        this.filteredVehicles3=of(this.filteredlist3);
        this.filteredVehicles4=of(this.filteredlist4);
      break;

      case 2:
      // code...
       /*for(let value of this.filteredlist1)
       {
         if(value.name===this.vehicle2.name)
         {
         if(value.total_no>1)
         {
           value.total_no=value.total_no-1;
         }
         else
           {
            this.filteredlist1.splice(this.filteredlist1.indexOf(value),1);
           }
         }
       }*/

       for(let value of this.filteredlist3)
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

       for(let value of this.filteredlist4)
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

      //  this.filteredVehicles1=of(this.filteredlist1);
        this.filteredVehicles3=of(this.filteredlist3);
        this.filteredVehicles4=of(this.filteredlist4);
      break;

      case 3:
      // code...
      /* for(let value of this.filteredlist1)
       {
         if(value.name===this.vehicle3.name)
         {
         if(value.total_no>1)
         {
           value.total_no=value.total_no-1;
         }
         else
           {
            this.filteredlist1.splice(this.filteredlist1.indexOf(value),1);
           }
         }
       }*/

      /* for(let value of this.filteredlist2)
       {
         if(value.name===this.vehicle3.name)
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
       }*/

       for(let value of this.filteredlist4)
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
        this.filteredVehicles4=of(this.filteredlist4);
        //this.filteredVehicles2=of(this.filteredlist2);
       // this.filteredVehicles1=of(this.filteredlist1);
      break;
    default:
      // code...
      break;
  }

     

}


  //Function to filter vehicles according to requirement
  filterVehicles(count:number,selectedPlanet:Planets):void
  {


    switch (count) {
      case 1:
        // code...
        {
        this.filteredlist1=this.filterAccordingToDistance(this.filteredlist1,selectedPlanet);
        this.filteredVehicles1=of(this.filteredlist1);
        break;
        }
       case 2:
               // code...
        {
        this.filteredlist2=this.filterAccordingToDistance(this.filteredlist2,selectedPlanet);
        this.filteredVehicles2=of(this.filteredlist2);
        break;
        }
        case 3:
               // code...
        {
        this.filteredlist3=this.filterAccordingToDistance(this.filteredlist3,selectedPlanet);
        this.filteredVehicles3=of(this.filteredlist3);
        break;
        }
        case 4:
               // code...
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

  //Function to add a planet to a selected array
  addSelectedPlanet():void
  {
        this.selectedPlanets.push(this.planet1.name.toString());
        this.selectedPlanets.push(this.planet2.name.toString());
        this.selectedPlanets.push(this.planet3.name.toString());
        this.selectedPlanets.push(this.planet4.name.toString());
        console.log("planet added");
  }

  //Function to add a planet to a selected array
  addSelectedVehicles():void
  {
        //this.selectedVehicles.push(vehicle.name);
        this.selectedVehicles.push(this.vehicle1.name.toString());
        this.selectedVehicles.push(this.vehicle2.name.toString());
        this.selectedVehicles.push(this.vehicle3.name.toString());
        this.selectedVehicles.push(this.vehicle4.name.toString());
         console.log("Vehicle added");
  }


  /*
  Function to calculate time taken
  time=distance/speed
  */
  calculateTimeTaken(vehicle:Vehicles,planet:Planets):void
  {
    let time=planet.distance/vehicle.speed;
    this.timeTaken=this.timeTaken+time;
  }


  onSelectingVehicle(option: number){

     let time:number= 0;
     switch (option) {
       case 1:
         // code...
         if(this.vehicle1)
         {
           this.calculateTimeTaken(this.vehicle1,this.planet1);
           this.filterVehicleUnits(1);
           this.showPlanet2=true;
           //this.stage=2;
         }
         break;
       case 2:
         // code...
         if(this.vehicle2)
         {
          // time=this.planet2.distance/this.vehicle2.speed;
           //this.timeTaken=this.timeTaken+time;
           this.calculateTimeTaken(this.vehicle2,this.planet2);
           this.filterVehicleUnits(2);
           this.showPlanet3=true;
           //this.stage=3;
         }
         break;
       case 3:
         // code...
         if(this.vehicle3)
         {
           //time=this.planet3.distance/this.vehicle3.speed;
           //this.timeTaken=this.timeTaken+time;
           this.calculateTimeTaken(this.vehicle3,this.planet3);
           this.filterVehicleUnits(3);
           this.showPlanet4=true;
           //this.stage=4;
         }
         break;
       case 4:
         // code...
         if(this.vehicle4)
         {
           //time=this.planet4.distance/this.vehicle4.speed;
           //this.timeTaken=this.timeTaken+time;
           //this.stage=4;
           this.calculateTimeTaken(this.vehicle4,this.planet4);
         }
         break;
       
       default:
         // code...
         this.timeTaken=0;
         break;
     }
   
  }

//Function to display planet name in autocomplete
 getSelectedPlanetText(planet:Planets) {
     return planet ? planet.name :'';
   }

//Function to remove already selected planets from other autocomplete lists
removeSelectedPlanet(selectedPlanet:Planets, destinationNumber:Number){
  //this.Planets.splice(this.Planets.indexOf(selectedPlanet),1)

switch (destinationNumber) {
  case 1:
    // code...
    {let eIndex=this.filteredPlanetlist2.findIndex(element=>(element.name===selectedPlanet.name));
      if(eIndex>=0)
    this.filteredPlanetlist2.splice(eIndex,1);

    eIndex=this.filteredPlanetlist3.findIndex(element=>(element.name===selectedPlanet.name));
    if(eIndex>=0)
    this.filteredPlanetlist3.splice(eIndex,1);

    eIndex=this.filteredPlanetlist4.findIndex(element=>(element.name===selectedPlanet.name));
    if(eIndex>=0)
    this.filteredPlanetlist4.splice(eIndex,1);

    this.filteredPlanets2=of(this.filteredPlanetlist2);
    this.filteredPlanets3=of(this.filteredPlanetlist3);
    this.filteredPlanets4=of(this.filteredPlanetlist4);
    break;}

   case 2:
    // code..

    {let eIndex=this.filteredPlanetlist3.findIndex(element=>(element.name===selectedPlanet.name));
    if(eIndex>=0)
    this.filteredPlanetlist3.splice(eIndex,1);

    eIndex=this.filteredPlanetlist4.findIndex(element=>(element.name===selectedPlanet.name));
    if(eIndex>=0)
    this.filteredPlanetlist4.splice(eIndex,1);

    this.filteredPlanets3=of(this.filteredPlanetlist3);
    this.filteredPlanets4=of(this.filteredPlanetlist4);
    break;}

  case 3:
    // code...
   {  
    let eIndex=this.filteredPlanetlist4.findIndex(element=>(element.name===selectedPlanet.name));
    if(eIndex>=0)
    this.filteredPlanetlist4.splice(eIndex,1);
    break;}
  
  default:
    // code...
    break;
}
}


//Function to get token from server
   SearchFalcon(): void
  {

    this.FindingfalconeService.findingFalconToken()
    .subscribe(Token=>{this.Token=Token;
       this.findFalcon(this.Token);
       });

   }
 
//Function to find findingFalcon
findFalcon(token:Token ):void{
 let FindFalconRequest:FindFalconRequest={
   token:token.token,
   planet_names:this.selectedPlanets,
   vehicle_names:this.selectedVehicles
 };

 //Routing to result page
 this.FindingfalconeService.findFalcon(FindFalconRequest)
    .subscribe(data=>{console.log(data);
      this.router.navigateByUrl('/result', { state: data });
    });


}

//Function to enable search functionality
  onSubmit(): void {
    if(this.searchForm.valid)
    {
    this.addSelectedPlanet();
    this.addSelectedVehicles();
    this.SearchFalcon();
    }
    else
    {
      console.log("Form invalid");
    }
  }

//Function to reset page
onReset(stage:Number):void{

  switch (stage) {
    case 1:
    {
      this.stage=1;
      this.vehicle1={} as Vehicles;
      this.vehicle2={} as Vehicles;
      this.vehicle3={} as Vehicles;
      this.vehicle4={} as Vehicles;
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
      break;
    }
    case 2:
    {
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
      break;
    }
    case 3:
    {
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
      break;
    }

    case 4:
      // code...
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
      break;

    default:
      // code...
      break;
  }

}

}

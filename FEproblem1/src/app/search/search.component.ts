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

    searchForm = this.fb.group({
  //  company: null,
 //   firstName: [null, Validators.required],
    //shipping: ['free', Validators.required]
    
     
  });
  Destination1: FormControl=new FormControl();
    Destination2:FormControl= new FormControl();
    Destination3:FormControl= new FormControl();
    Destination4:FormControl= new FormControl();
    selectedVehicle1:FormControl=new FormControl();
    selectedVehicle2:FormControl=new FormControl();
    selectedVehicle3:FormControl=new FormControl();
    selectedVehicle4:FormControl=new FormControl();
  Token: Token={} as Token;
  vehicle1: Vehicles;
  vehicle2: Vehicles;
  vehicle3: Vehicles;
  vehicle4: Vehicles;
  planet1: Planets;
  planet2: Planets;
  planet3: Planets;
  planet4: Planets;
  timeTaken=0;
  Planets: Planets[]=[];
  Vehicles: Vehicles[]=[];
  filteredVehicles1:Observable<Vehicles[]>; 
  filteredVehicles2: Observable<Vehicles[]>; 
  filteredVehicles3: Observable<Vehicles[]>; 
  filteredVehicles4: Observable<Vehicles[]>; 
  showVehicle1:  boolean=true;
  showVehicle2:  boolean=true;
  showVehicle3:  boolean=true;
  showVehicle4:  boolean=true;
  showPlanet1:  boolean=false;
  showPlanet2:  boolean=false;
  showPlanet3:  boolean=false;
  showPlanet4:  boolean=false;
  selectedPlanets: string[]=[];
  selectedVehicles:  string[]=[];
  filteredlist1:Vehicles[]=[];
  filteredlist2:Vehicles[]=[];
  filteredlist3:Vehicles[]=[];
  filteredlist4:Vehicles[]=[];
  
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

//Function to filter planets
 filterPlanets(pName: any,initial:true) {


    let planetName = pName.name || pName; // pName can be a planet or a string
    return this.Planets.filter(planet =>
      planet.name.toLowerCase().indexOf(planetName.toLowerCase()) === 0);

  }
  

  //Function to get planets from server
  getPlanets(): void
  {

    this.planetsService.getPlanets()
      .subscribe(Planets=>{this.Planets=Planets;
        console.log(this.Planets);
        this.filteredPlanets1=of(this.Planets);
       });
   }

  onSelectingPlanet(destination:string,  selectedPlanet:Planets):void{
      
    switch (destination) {
      case "dest1":
        // code...
        {
          this.showVehicle1=  false;
          this.removeSelectedPlanet(selectedPlanet,1);
          this.filterVehicles(1,selectedPlanet);
          
          break;
      }
      case "dest2":
        {
          this.showVehicle2=  false;
          this.removeSelectedPlanet(selectedPlanet,2);
          this.filterVehicles(2,selectedPlanet);
          break;}
      case "dest3":
        {
          this.showVehicle3=  false;
          this.removeSelectedPlanet(selectedPlanet,3);
          this.filterVehicles(3,selectedPlanet);
          break;}
      case "dest4":
        {
          this.showVehicle4=  false;
          this.removeSelectedPlanet(selectedPlanet,4);
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
         this.Vehicles=data;
         this.filteredlist4=JSON.parse(JSON.stringify(this.Vehicles));
         this.filteredlist3=JSON.parse(JSON.stringify(this.Vehicles));
         this.filteredlist2=JSON.parse(JSON.stringify(this.Vehicles));
         this.filteredlist1=JSON.parse(JSON.stringify(this.Vehicles));
       }
         );
      
   }


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
       for(let value of this.filteredlist1)
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
       }

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

        this.filteredVehicles1=of(this.filteredlist1);
        this.filteredVehicles3=of(this.filteredlist3);
        this.filteredVehicles4=of(this.filteredlist4);
      break;

      case 3:
      // code...
       for(let value of this.filteredlist1)
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
       }

       for(let value of this.filteredlist2)
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
       }

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
        this.filteredVehicles2=of(this.filteredlist2);
        this.filteredVehicles1=of(this.filteredlist1);
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
  calculateTimeTaken(option: number){

     let time:number= 0;
     switch (option) {
       case 1:
         // code...
         if(this.vehicle1)
         {
           time=this.planet1.distance/this.vehicle1.speed;
           this.timeTaken=this.timeTaken+time;
           this.filterVehicleUnits(1);
           this.showPlanet2=true;
         }
         break;
       case 2:
         // code...
         if(this.vehicle2)
         {
           time=this.planet2.distance/this.vehicle2.speed;
           this.timeTaken=this.timeTaken+time;
           this.filterVehicleUnits(2);
           this.showPlanet3=true;
         }
         break;
       case 3:
         // code...
         if(this.vehicle3)
         {
           time=this.planet3.distance/this.vehicle3.speed;
           this.timeTaken=this.timeTaken+time;
           this.filterVehicleUnits(3);
           this.showPlanet4=true;
         }
         break;
       case 4:
         // code...
         if(this.vehicle4)
         {
           time=this.planet4.distance/this.vehicle4.speed;
           this.timeTaken=this.timeTaken+time;
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
  this.Planets.splice(this.Planets.indexOf(selectedPlanet),1)

switch (destinationNumber) {
  case 1:
    // code...
    this.filteredPlanets2.subscribe(
                     data=>{data=this.Planets;
          });
    this.filteredPlanets3.subscribe(
                     data=>{data=this.Planets;
          });
    this.filteredPlanets4.subscribe(
                     data=>{data=this.Planets;
          });
    break;

   case 2:
    // code...
    this.filteredPlanets1.subscribe(
                     data=>{data=this.Planets;
          });
    this.filteredPlanets3.subscribe(
                     data=>{data=this.Planets;
          });
    this.filteredPlanets4.subscribe(
                     data=>{data=this.Planets;
          });
    break;

  case 3:
    // code...
   this.filteredPlanets1.subscribe(
                     data=>{data=this.Planets;
          });
    this.filteredPlanets2.subscribe(
                     data=>{data=this.Planets;
          });
    this.filteredPlanets4.subscribe(
                     data=>{data=this.Planets;
          });
    break;

  case 4:
    // code...
   this.filteredPlanets1.subscribe(
                     data=>{data=this.Planets;
          });
    this.filteredPlanets2.subscribe(
                     data=>{data=this.Planets;
          });
    this.filteredPlanets3.subscribe(
                     data=>{data=this.Planets;
          });
    break;
  
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
    this.addSelectedPlanet();
    this.addSelectedVehicles();
    this.SearchFalcon();
  }

}

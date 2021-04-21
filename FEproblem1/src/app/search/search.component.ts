import { Component, OnInit, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute,Router} from '@angular/router';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Observable,of} from 'rxjs';
import {map,filter,startWith,tap} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent}from '@angular/material/autocomplete';
import {MatAutocompleteActivatedEvent}from '@angular/material/autocomplete';
import {FindingfalconeService} from '../findingfalcone.service';


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
  
  Token: Token={} as Token;
  vehicle1: Vehicles;
  vehicle2: Vehicles;
  vehicle3: Vehicles;
  vehicle4: Vehicles;
  timeTaken=0;
  Planets: Planets[]=[];
  Vehicles: Vehicles[]=[];
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
  Destination1=new FormControl();
  Destination2=new FormControl();
  Destination3=new FormControl();
  Destination4=new FormControl();

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private planetsService: PlanetsService,
              private vehicleService: VehiclesService,
              private FindingfalconeService: FindingfalconeService
              ) {}

ngOnInit() {
          this.getPlanets();
        
      
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
   
    this.getVehicles();
    } 

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
      this.filteredPlanets1.subscribe(
                     data=>{data=this.Planets;
          });
       });
   }

  onSelectingPlanet(destination:string,  selectedPlanet:Planets):void{
      
    switch (destination) {
      case "dest1":
        // code...
        {
          this.showVehicle1=  false;
          this.removeSelectedPlanet(selectedPlanet,1);
          //this.showPlanet2=true;
          break;
      }
      case "dest2":
        {
          this.showVehicle2=  false;
          this.removeSelectedPlanet(selectedPlanet,2);
          //this.showPlanet3=true;
          break;}
      case "dest3":
        {
          this.showVehicle3=  false;
          this.removeSelectedPlanet(selectedPlanet,3);
          //this.showPlanet4=true;
          break;}
      case "dest4":
        {
          this.showVehicle4=  false;
          this.removeSelectedPlanet(selectedPlanet,4);
          break;}
      default:
        // code...
       {
        this.showVehicle1=  true;
        this.showVehicle2=  true;
        this.showVehicle3=  true;
        this.showVehicle4=  true;
        //this.showPlanet2=false;
       // this.showPlanet3=false;
       // this.showPlanet4=false;
        break;
      }
    }
        
   }

 //Function to get vehicles from server
  getVehicles(): void
  {

    this.vehicleService.getVehicles()
      .subscribe(Vehicles=>{this.Vehicles=Vehicles;
        console.log(this.Vehicles);});
       
   }


  //Function to add a planet to a selected array
  addSelectedPlanet():void
  {
        this.selectedPlanets.push(this.Destination1.value.name.toString());
        this.selectedPlanets.push(this.Destination2.value.name.toString());
        this.selectedPlanets.push(this.Destination3.value.name.toString());
        this.selectedPlanets.push(this.Destination4.value.name.toString());
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
           time=this.Destination1.value.distance/this.vehicle1.speed;
           this.timeTaken=this.timeTaken+time;
           this.showPlanet2=true;
         break;
       case 2:
         // code...
           time=this.Destination2.value.distance/this.vehicle2.speed;
           this.timeTaken=this.timeTaken+time;
           this.showPlanet3=true;
         break;
       case 3:
         // code...
           time=this.Destination3.value.distance/this.vehicle3.speed;
           this.timeTaken=this.timeTaken+time;
           this.showPlanet4=true;
         break;
       case 4:
         // code...
           time=this.Destination4.value.distance/this.vehicle4.speed;
           this.timeTaken=this.timeTaken+time;
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

import { Component, OnInit, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute,Router} from '@angular/router';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatAutocompleteActivatedEvent}from '@angular/material/autocomplete';
import {FindingfalconeService} from '../findingfalcone.service';


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
    //myControl = new FormControl();
    filteredPlanets1: Observable<Planets[]>;
    /*@ViewChild('destination1') destination1:ElementRef<HTMLInputElement>;
    @ViewChild('destination2') destination2:ElementRef<HTMLInputElement>;
    @ViewChild('destination3') destination3:ElementRef<HTMLInputElement>;
    @ViewChild('destination4') destination4:ElementRef<HTMLInputElement>;
    */
    

    searchForm = this.fb.group({
  //  company: null,
 //   firstName: [null, Validators.required],
   // lastName: [null, Validators.required],
    //address: [null, Validators.required],
    //address2: null,
    //city: [null, Validators.required],
   // state: [null, Validators.required],
    //postalCode: [null, Validators.compose([
   //   Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    //],
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
  /*this.filteredPlanets1 = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );*/
    this.getPlanets();
    this.getVehicles();
    } 


  //Function to get planets from server
  getPlanets(): void
  {

    this.planetsService.getPlanets()
      .subscribe(Planets=>{this.Planets=Planets;
        console.log(this.Planets);});
       
   }

  onSelectingPlanet(value:object,destination:string):  void{
   // this.showVehicle1=  !this.showVehicle1;
    
    switch (destination) {
      case "dest1":
        // code...
        {this.showVehicle1=  true;

        break;}
      case "dest2":
        {this.showVehicle2=  true;
        break;}
      case "dest3":
        {this.showVehicle3=  true;
        break;}
      case "dest4":
        {this.showVehicle4=  true;
        break;}
      default:
        // code...
       {
        this.showVehicle1=  false;
        this.showVehicle2=  false;
        this.showVehicle3=  false;
        this.showVehicle4=  false;
        break;
      }
    }
         console.log(value);
   }

 //Function to get vehicles from server
  getVehicles(): void
  {

    this.vehicleService.getVehicles()
      .subscribe(Vehicles=>{this.Vehicles=Vehicles;
        console.log(this.Vehicles);});
       
   }


  private _filter(value: Planets[]): Planets[] {
    const filterValue = value;
    return this.Planets ;
  }

  //Function to add a planet to a selected array
  addSelectedPlanet():void
  {
        this.selectedPlanets.push(this.Destination1.value.toString());
        this.selectedPlanets.push(this.Destination2.value.toString());
        this.selectedPlanets.push(this.Destination3.value.toString());
        this.selectedPlanets.push(this.Destination4.value.toString());
        console.log("planet added");
  }

  //Function to add a planet to a selected array
  addSelectedVehicles():void
  {
        //this.selectedVehicles.push(vehicle.name);
        this.selectedVehicles.push(this.vehicle1.toString());
        this.selectedVehicles.push(this.vehicle2.toString());
        this.selectedVehicles.push(this.vehicle3.toString());
        this.selectedVehicles.push(this.vehicle4.toString());
         console.log("Vehicle added");
  }


  /*
  Function to calculate time taken
  time=distance/speed
  */
  calculateTimeTaken(planet:Planets,vehicle:Vehicles){
     let time:number= planet.distance/vehicle.speed;
     this.timeTaken=this.timeTaken+time;
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

 this.FindingfalconeService.findFalcon(FindFalconRequest)
    .subscribe(data=>{console.log(data);
      this.router.navigateByUrl('/result', { state: data });
    });


}

  onSubmit(): void {
    alert('Thanks!');
    this.addSelectedPlanet();
    this.addSelectedVehicles();
    this.SearchFalcon();
  }
}

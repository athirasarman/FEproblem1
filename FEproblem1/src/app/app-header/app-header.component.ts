import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {HttpResponse,HttpClient} from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})


export class AppHeaderComponent implements OnInit {
  title = 'Finding Falcone!';

  @Input() isMenuOpened: boolean;
  @Output() isShowSidebar = new EventEmitter<boolean>();
	
	 isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }
  
  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;

    this.isShowSidebar.emit(this.isMenuOpened);
  }

}

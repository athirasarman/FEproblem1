import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AppHeaderComponent } from './app-header.component';

describe('AppHeaderComponent', () => {
  let appHeaderComponent: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHeaderComponent);
    fixture.detectChanges();
    appHeaderComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(appHeaderComponent).toBeTruthy();
  });

  it(`should have as title 'Finding Falcone!'`, () => {
     expect(appHeaderComponent.title).toEqual('Finding Falcone!');
  });

  it('should render title in a h6 tag', async(() => {
   
   const compiled = fixture.debugElement.nativeElement;
 expect(compiled.querySelector('h6').textContent).toContain('Finding Falcone!');
}));

  
  it('should render Home button ', async(() => {
   
   const button = fixture.debugElement.nativeElement;
    expect(button.querySelector('mat-icon').textContent).toContain('home');
 
}));

  it('should render Geektrust Home button ', async(() => {
   
   const button = fixture.debugElement.nativeElement
    expect(button.querySelector('a').textContent).toContain('Geektrust Home');
 
}));
});

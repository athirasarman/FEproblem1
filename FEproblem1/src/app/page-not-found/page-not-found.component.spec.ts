import { waitForAsync, ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let pageNotFoundComponent: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    pageNotFoundComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(pageNotFoundComponent).toBeTruthy();
  });

    it(`should have a title '404'`, () => {
     expect(pageNotFoundComponent.title).toEqual("404");
  });
      it(`should have a sub title 'Oops. Looks like the page you're looking for no longer exists'`, () => {
     expect(pageNotFoundComponent.subTitle).toEqual("Oops. Looks like the page you're looking for no longer exists");
  });

  it(`should have an error message 'But we're here to bring you back to safety'`, () => {
     expect(pageNotFoundComponent.errorMessage).toEqual("But we're here to bring you back to safety");
  });

  it('should render button to navigate to Home page ', async(() => {
   
   const button = fixture.debugElement.nativeElement
    expect(button.querySelector('button').textContent).toContain('Back to Home');
 
}));
});

import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AppFooterComponent } from './app-footer.component';

describe('AppFooterComponent', () => {
  let appFootercomponent: AppFooterComponent;
  let fixture: ComponentFixture<AppFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFooterComponent);
    appFootercomponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(appFootercomponent).toBeTruthy();
  });

  it(`should have a copy right '@2012. All Rights Reserved.'`, () => {
     expect(appFootercomponent.copyRight).toEqual('@2012. All Rights Reserved.');
  });

   it('should render title in a span tag', async(() => {
   
   const compiled = fixture.debugElement.nativeElement;
   expect(compiled.querySelector('span').textContent).toContain('@2012. All Rights Reserved.');
}));
});

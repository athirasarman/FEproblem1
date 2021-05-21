import { ComponentFixture, TestBed } from '@angular/core/testing';

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
});

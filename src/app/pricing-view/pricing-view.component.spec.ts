import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingViewComponent } from './pricing-view.component';

describe('PricingViewComponent', () => {
  let component: PricingViewComponent;
  let fixture: ComponentFixture<PricingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

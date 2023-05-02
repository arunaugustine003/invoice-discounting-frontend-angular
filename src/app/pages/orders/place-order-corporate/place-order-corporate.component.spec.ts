import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOrderCorporateComponent } from './place-order-corporate.component';

describe('PlaceOrderCorporateComponent', () => {
  let component: PlaceOrderCorporateComponent;
  let fixture: ComponentFixture<PlaceOrderCorporateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceOrderCorporateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceOrderCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

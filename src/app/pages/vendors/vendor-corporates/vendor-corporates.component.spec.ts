import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCorporatesComponent } from './vendor-corporates.component';

describe('VendorCorporatesComponent', () => {
  let component: VendorCorporatesComponent;
  let fixture: ComponentFixture<VendorCorporatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorCorporatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorCorporatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

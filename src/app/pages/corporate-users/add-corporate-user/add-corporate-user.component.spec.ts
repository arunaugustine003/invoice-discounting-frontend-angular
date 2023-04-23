import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCorporateUserComponent } from './add-corporate-user.component';

describe('AddCorporateUserComponent', () => {
  let component: AddCorporateUserComponent;
  let fixture: ComponentFixture<AddCorporateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCorporateUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCorporateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

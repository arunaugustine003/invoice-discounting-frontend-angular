import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesL2Component } from './invoices-l2.component';

describe('InvoicesL2Component', () => {
  let component: InvoicesL2Component;
  let fixture: ComponentFixture<InvoicesL2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesL2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicesL2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesL1Component } from './invoices-l1.component';

describe('InvoicesL1Component', () => {
  let component: InvoicesL1Component;
  let fixture: ComponentFixture<InvoicesL1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesL1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicesL1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

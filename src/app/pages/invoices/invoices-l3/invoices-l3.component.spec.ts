import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesL3Component } from './invoices-l3.component';

describe('InvoicesL3Component', () => {
  let component: InvoicesL3Component;
  let fixture: ComponentFixture<InvoicesL3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesL3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicesL3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

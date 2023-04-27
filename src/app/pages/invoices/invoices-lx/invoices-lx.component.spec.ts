import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesLxComponent } from './invoices-lx.component';

describe('InvoicesLxComponent', () => {
  let component: InvoicesLxComponent;
  let fixture: ComponentFixture<InvoicesLxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesLxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicesLxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

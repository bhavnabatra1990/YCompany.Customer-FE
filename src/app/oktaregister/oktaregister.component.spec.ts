import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OktaregisterComponent } from './oktaregister.component';

describe('OktaregisterComponent', () => {
  let component: OktaregisterComponent;
  let fixture: ComponentFixture<OktaregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OktaregisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OktaregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

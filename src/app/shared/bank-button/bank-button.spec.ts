import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankButton } from './bank-button';

describe('BankButton', () => {
  let component: BankButton;
  let fixture: ComponentFixture<BankButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BankButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

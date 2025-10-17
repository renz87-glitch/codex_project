import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { RadioButtonGroupComponent } from './radio-button-group.component';

describe('RadioButtonGroupComponent', () => {
  let component: RadioButtonGroupComponent<string>;
  let fixture: ComponentFixture<RadioButtonGroupComponent<string>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadioButtonGroupComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RadioButtonGroupComponent);
    component = fixture.componentInstance;
    component.options = [
      { label: 'Uno', value: 'one' },
      { label: 'Due', value: 'two' }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

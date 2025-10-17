import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface RadioOption {
  label: string;
  value: any;
  tooltip?: string;
}

@Component({
  selector: 'app-radio-button-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="btn-group" role="group">
      <a
        *ngFor="let option of options"
        href="javascript:void(0)"
        class="btn btn-default"
        [class.active]="isSelected(option.value)"
        [class.disabled]="disabled"
        [attr.title]="option.tooltip || null"
        [attr.aria-disabled]="disabled ? true : null"
        [attr.aria-pressed]="isSelected(option.value)"
        [attr.tabindex]="disabled ? -1 : 0"
        (click)="selectOption(option.value)"
        (keydown.enter)="selectOption(option.value)"
        (keydown.space)="selectOption(option.value); $event.preventDefault()"
      >
        {{ option.label }}
      </a>
    </div>
  `,
  styles: [`
    .btn-group .btn {
      margin-right: -1px;
    }

    .btn.active {
      background-color: #337ab7;
      border-color: #2e6da4;
      color: #fff;
    }

    .btn.active:hover,
    .btn.active:focus {
      background-color: #286090;
      border-color: #204d74;
      color: #fff;
    }

    .btn.disabled {
      cursor: not-allowed;
      opacity: 0.65;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonGroupComponent),
      multi: true
    }
  ]
})
export class RadioButtonGroupComponent implements ControlValueAccessor {
  @Input() options: RadioOption[] = [];
  @Input() disabled = false;

  value: any = null;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  isSelected(optionValue: any): boolean {
    return this.value === optionValue;
  }

  selectOption(value: any): void {
    if (this.disabled) {
      return;
    }

    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

import { Component, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface RadioOption {
  label: string;
  value: any;
  tooltip?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-radio-button-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="btn-group" role="group" [class.disabled]="disabled" [attr.aria-disabled]="disabled ? 'true' : null" [attr.aria-required]="required ? 'true' : null" [attr.aria-invalid]="isAriaInvalid() ? 'true' : null">
      <a
        *ngFor="let option of options"
        href="javascript:void(0)"
        class="btn"
        [class.btn-primary]="isSelected(option.value)"
        [class.btn-default]="!isSelected(option.value)"
        [class.disabled]="disabled || option.disabled"
        [style.cursor]="(disabled || option.disabled) ? 'not-allowed' : null"
        [attr.title]="option.tooltip || null"
        [attr.aria-disabled]="(disabled || option.disabled) ? 'true' : null"
        [attr.aria-pressed]="isSelected(option.value) ? 'true' : 'false'"
        [attr.tabindex]="(disabled || option.disabled) ? -1 : 0"
        (click)="selectOption(option)"
        (keydown.enter)="selectOption(option)"
        (keydown.space)="selectOption(option); $event.preventDefault()"
      >
        {{ option.label }}
      </a>
      <a
        *ngIf="showNotDefined"
        href="javascript:void(0)"
        class="btn"
        [class.btn-primary]="isSelected(notDefinedValue)"
        [class.btn-default]="!isSelected(notDefinedValue)"
        [class.disabled]="disabled"
        [style.cursor]="disabled ? 'not-allowed' : null"
        [attr.title]="notDefinedTooltip || null"
        [attr.aria-disabled]="disabled ? 'true' : null"
        [attr.aria-pressed]="isSelected(notDefinedValue) ? 'true' : 'false'"
        [attr.tabindex]="disabled ? -1 : 0"
        (click)="selectNotDefined()"
        (keydown.enter)="selectNotDefined()"
        (keydown.space)="selectNotDefined(); $event.preventDefault()"
      >
        {{ notDefinedLabel }}
      </a>
    </div>
  `,
  styles: [`
    .btn-group .btn {
      margin-right: -1px;
    }

    .btn-group.disabled,
    .btn-group.disabled .btn {
      cursor: not-allowed;
    }

    /* Rely on Bootstrap's btn-default/btn-primary for active state */

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
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RadioButtonGroupComponent),
      multi: true
    }
  ]
})
export class RadioButtonGroupComponent implements ControlValueAccessor, Validator, OnChanges {
  @Input() options: RadioOption[] = [];
  @Input() disabled = false;
  @Input() required = false;
  @Input() showNotDefined = false;
  @Input() notDefinedLabel: string = 'n.d.';
  @Input() notDefinedTooltip: string = 'Non definito';
  @Input() notDefinedValue: any = null;
  @Input() notDefinedTreatEmptyString: boolean = false;

  value: any = null;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
  private onValidatorChange: () => void = () => {};

  // Note: Angular già applica le classi ng-* sull'host quando usato con ngModel/FormControlName.
  // Evitiamo di iniettare NgControl per scongiurare cicli DI.

  isSelected(optionValue: any): boolean {
    // Special handling for not-defined option: treat null/undefined (and optionally empty string) as equivalent
    if (this.showNotDefined) {
      const isNullish = (v: any) => v === null || v === undefined || (this.notDefinedTreatEmptyString && v === '');
      if (optionValue === this.notDefinedValue && isNullish(this.notDefinedValue) && isNullish(this.value)) {
        return true;
      }
    }
    return this.value === optionValue;
  }

  selectOption(option: RadioOption): void {
    if (this.disabled || option?.disabled) {
      return;
    }

    const value = option.value;
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

  selectNotDefined(): void {
    this.selectOption({ label: this.notDefinedLabel, value: this.notDefinedValue } as any);
  }

  // Validator implementation
  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.required) {
      return null;
    }
    return this.hasSelection() ? null : { required: true };
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['required']) {
      this.onValidatorChange();
    }
  }

  private hasSelection(): boolean {
    const baseSelected = this.options?.some(opt => this.isSelected(opt.value)) || false;
    const ndSelected = !!this.showNotDefined && this.isSelected(this.notDefinedValue);
    return baseSelected || ndSelected;
  }

  isAriaInvalid(): boolean {
    if (!this.required) return false;
    return !this.hasSelection();
  }
}

import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

type Primitive = string | number | boolean | null | undefined;

export interface RadioButtonOption<T extends Primitive = Primitive> {
  label: string;
  value: T;
  disabled?: boolean;
}

@Component({
  selector: 'app-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  styleUrls: ['./radio-button-group.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonGroupComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonGroupComponent<T extends Primitive = Primitive>
  implements ControlValueAccessor
{
  @Input() options: RadioButtonOption<T>[] = [];
  @Input() name?: string;

  private isDisabled = false;
  value?: T;

  private onChange: (value: T | undefined) => void = () => {};
  private onTouched: () => void = () => {};

  get isGroupDisabled(): boolean {
    return this.isDisabled;
  }

  selectOption(option: RadioButtonOption<T>, event: MouseEvent): void {
    event.preventDefault();
    if (this.isDisabled || option.disabled) {
      return;
    }

    if (this.value !== option.value) {
      this.value = option.value;
      this.onChange(option.value);
    }

    this.onTouched();
  }

  isActive(option: RadioButtonOption<T>): boolean {
    return option.value === this.value;
  }

  writeValue(value: T | undefined): void {
    this.value = value ?? undefined;
  }

  registerOnChange(fn: (value: T | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}

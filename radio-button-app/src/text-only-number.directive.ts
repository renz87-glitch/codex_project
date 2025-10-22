import {
  Directive,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from "@angular/forms";

export enum NumericValidationMode {
  NumericZeroAllowed = "numericZeroAllowed",
  NumericZeroForbidden = "numericZeroForbidden",
}

@Directive({
  selector: "input[appTextOnlyNumber]",
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextOnlyNumberDirective),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextOnlyNumberDirective),
      multi: true,
    },
  ],
})
export class TextOnlyNumberDirective
  implements ControlValueAccessor, Validator, OnChanges
{
  @Input() required = false;
  @Input() mode: NumericValidationMode =
    NumericValidationMode.NumericZeroAllowed;
  @Input() allowNegative = true;
  @Input() maxDecimals: number | null = null; // null = any

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private onValidatorChange: () => void = () => {};

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private renderer: Renderer2
  ) {}

  // Keep ARIA in sync with validation state
  @HostBinding("attr.aria-required") get ariaRequired() {
    return this.required ? "true" : null;
  }
  @HostBinding("attr.aria-invalid") get ariaInvalid() {
    return this.hasErrors() ? "true" : null;
  }

  // Listen to native input/blur to propagate CVA callbacks
  @HostListener("input", ["$event.target.value"])
  _onInput(value: string) {
    this.onChange(value);
    // Forza ricomputo della validazione su ogni input (es. quando il campo viene svuotato)
    this.onValidatorChange();
  }

  @HostListener("blur")
  _onBlur() {
    this.onTouched();
  }

  // ControlValueAccessor
  writeValue(value: any): void {
    const normalized = value == null ? "" : value;
    this.renderer.setProperty(this.el.nativeElement, "value", normalized);
    // Aggiorna validazione per cambi programmatici
    this.onValidatorChange();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.el.nativeElement, "disabled", isDisabled);
  }

  // Validator
  validate(control: AbstractControl): ValidationErrors | null {
    const ctlValue = control?.value;
    return this.computeErrors(typeof ctlValue === 'string' ? ctlValue : (ctlValue == null ? '' : String(ctlValue)));
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes["required"] ||
      changes["mode"] ||
      changes["allowNegative"] ||
      changes["maxDecimals"]
    ) {
      this.onValidatorChange();
    }
  }

  private hasValue(): boolean {
    const value = this.el.nativeElement.value;
    return value != null && value.trim() !== "";
  }

  private hasErrors(): boolean {
    const raw = this.el.nativeElement.value ?? "";
    return this.computeErrors(String(raw)) != null;
  }

  private computeErrors(input: string): ValidationErrors | null {
    const value = String(input ?? '').trim();

    // required
    if (this.required && value === "") {
      return { required: true };
    }

    // skip rest if empty (not required)
    if (value === "") {
      return null;
    }

    // Costruisci un'unica regex che gestisce:
    // - segno (solo + se negativi non ammessi)
    // - separatore decimale sia "." che ","
    // - massimo numero di decimali
    // - opzionale divieto dello zero (lookahead negativo)
    const signPart = this.allowNegative ? "[+-]?" : "\\+?";

    // decimali: 0 => vietati; n>0 => {1,n}; null => + (qualsiasi)
    let decimalsQuant = ".+"; // default: qualsiasi lunghezza
    if (this.maxDecimals === 0) {
      decimalsQuant = ""; // blocchiamo proprio la parte decimale (nessuna)
    } else if (this.maxDecimals != null && this.maxDecimals > 0) {
      decimalsQuant = `{1,${this.maxDecimals}}`;
    }

    // parte decimale in base a decimalsQuant
    const decimalPart = this.maxDecimals === 0 ? "" : `(?:[\.,]\\d${decimalsQuant})?`;

    // lookahead per vietare rappresentazioni di zero se richiesto
    const zeroLookahead =
      this.mode === NumericValidationMode.NumericZeroForbidden
        ? "(?![+-]?(?:0+)(?:[\.,]0+)?$)"
        : "";

    const pattern = `^${zeroLookahead}${signPart}\\d+${decimalPart}$`;
    const unified = new RegExp(pattern);
    if (!unified.test(value)) {
      return { numeric: true };
    }
    return null;
  }

  // matchesNumericPattern removed: replaced by single regex in computeErrors

  // isZeroString non necessario: il controllo sullo zero è integrato nel lookahead della regex unificata
}

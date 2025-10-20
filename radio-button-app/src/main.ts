import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RadioButtonGroupComponent } from './radio-button-group.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RadioButtonGroupComponent],
  template: `
    <div class="container">
      <div class="page-header">
        <h1>Radio Button Group <small>con Bootstrap 3</small></h1>
      </div>

      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Seleziona una dimensione</h3>
        </div>
        <div class="panel-body">
          <form ngNativeValidate #form1="ngForm">
          <app-radio-button-group
            [options]="sizeOptions"
            [(ngModel)]="selectedSize"
            name="size"
            [required]="true"
            [showNotDefined]="true"
          ></app-radio-button-group>
          </form>
          <div class="alert alert-info" style="margin-top: 15px;" role="alert">
            Dimensione selezionata: <strong>{{ selectedSize ?? 'Nessuna' }}</strong>
          </div>
          <div *ngIf="!form1.valid" class="alert alert-danger" style="margin-top: 15px;" role="alert">
            Form non valido
          </div>
        </div>
      </div>

      <div class="panel panel-primary">
        <div class="panel-heading">
          <h3 class="panel-title">Seleziona un colore</h3>
        </div>
        <div class="panel-body">
          <app-radio-button-group
            [options]="colorOptions"
            [(ngModel)]="selectedColor"
            name="color"
            [showNotDefined]="true"
          ></app-radio-button-group>
          <div class="alert alert-success" style="margin-top: 15px;" role="alert">
            Colore selezionato: <strong>{{ selectedColor ?? 'Nessuno' }}</strong>
          </div>
        </div>
      </div>

      <div class="panel panel-warning">
        <div class="panel-heading">
          <h3 class="panel-title">Gruppo disabilitato</h3>
        </div>
        <div class="panel-body">
          <app-radio-button-group
            [options]="disabledOptions"
            [(ngModel)]="selectedDisabled"
            name="disabledGroup"
            [disabled]="true"
          ></app-radio-button-group>
          <p class="help-block">Questo gruppo di opzioni è disabilitato</p>
        </div>
      </div>

      <div class="panel panel-info">
        <div class="panel-heading">
          <h3 class="panel-title">Opzioni miste (alcune disabilitate)</h3>
        </div>
        <div class="panel-body">
          <app-radio-button-group
            [options]="mixedOptions"
            [(ngModel)]="selectedMixed"
            name="mixed"
          ></app-radio-button-group>
          <div class="alert alert-info" style="margin-top: 15px;" role="alert">
            Selezione: <strong>{{ selectedMixed ?? 'Nessuna' }}</strong>
          </div>
          <p class="help-block">Alcune opzioni sono disabilitate per mostrare il comportamento misto.</p>
        </div>
      </div>

      <div class="panel panel-danger">
        <div class="panel-heading">
          <h3 class="panel-title">Opzioni con regole invalid (tema rosso)</h3>
        </div>
        <div class="panel-body">
          <form ngNativeValidate #form3="ngForm">
          <app-radio-button-group
            [options]="invalidOptions"
            [(ngModel)]="selectedInvalid"
            name="invalid"
            [required]="true"
            [showNotDefined]="true"
            [invalidValues]="['legacy']"
          ></app-radio-button-group>
          </form>
          <div class="alert alert-warning" style="margin-top: 15px;" role="alert">
            Selezione: <strong>{{ selectedInvalid ?? 'Nessuna' }}</strong>
          </div>
          <p class="help-block">
            Se selezioni un'opzione non valida (es. "Legacy"), il bottone attivo diventa rosso (btn-danger) e il form resta non valido.
          </p>
          <div *ngIf="!form3.valid" class="alert alert-danger" style="margin-top: 15px;" role="alert">
            Form non valido (required + valore non valido)
          </div>
        </div>
      </div>
      
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Check boolean</h3>
        </div>
        <div class="panel-body">
          <form ngNativeValidate #form2="ngForm">
          <app-radio-button-group
            [options]="boolOptions"
            [(ngModel)]="selectedBool"
            name="bool"
            [required]="true"
            [showNotDefined]="true"
          ></app-radio-button-group>
          </form>
          <div class="alert alert-info" style="margin-top: 15px;" role="alert">
            Valore selezionato: <strong>{{ selectedBool ?? 'Nessuna' }}</strong>
          </div>
          <div *ngIf="!form2.valid" class="alert alert-danger" style="margin-top: 15px;" role="alert">
            Form non valido
          </div>
        </div>
      </div> 
    </div>

    
  `,
})
export class App {
  selectedSize: any = null;       // null per preselezionare "n.d."
  selectedColor: any = null;      // null per preselezionare "n.d."
  selectedDisabled: any = null;
  selectedMixed: any = null;
  selectedBool: any = null;
  selectedInvalid: any = null;

  sizeOptions = [
    { label: 'Piccolo', value: 'S', tooltip: 'Taglia S: piccola' },
    { label: 'Medio', value: 'M', tooltip: 'Taglia M: media' },
    { label: 'Grande', value: 'L', tooltip: 'Taglia L: grande' },
    { label: 'Extra Large', value: 'XL', tooltip: 'Taglia XL: molto grande' }
  ];

  colorOptions = [
    { label: 'Rosso', value: 'red', tooltip: 'Colore rosso' },
    { label: 'Blu', value: 'blue', tooltip: 'Colore blu' },
    { label: 'Verde', value: 'green', tooltip: 'Colore verde' },
    { label: 'Giallo', value: 'yellow', tooltip: 'Colore giallo' }
  ];

  disabledOptions = [
    { label: 'Opzione 1', value: '1', tooltip: 'Tooltip disabilitato' },
    { label: 'Opzione 2', value: '2', tooltip: 'Tooltip disabilitato' }
  ];

  mixedOptions = [
    { label: 'Standard', value: 'std', tooltip: 'Opzione attiva' },
    { label: 'Premium', value: 'prem', tooltip: 'Opzione non disponibile', disabled: true },
    { label: 'Business', value: 'biz' },
    { label: 'Enterprise', value: 'ent', disabled: true }
  ];

  boolOptions = [
    { label: 'Si', value: true, tooltip: 'Acconsento' },
    { label: 'No', value: false, tooltip: 'Non acconsento' },    
  ];

  invalidOptions = [
    { label: 'Standard', value: 'std' },
    { label: 'Legacy', value: 'legacy', tooltip: 'Non supportato', invalid: true },
    { label: 'Modern', value: 'modern' }
  ];
}

bootstrapApplication(App);

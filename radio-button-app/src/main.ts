import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RadioButtonGroupComponent } from './radio-button-group.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RadioButtonGroupComponent],
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
          <app-radio-button-group
            [options]="sizeOptions"
            [(ngModel)]="selectedSize"
          ></app-radio-button-group>
          <div class="alert alert-info" style="margin-top: 15px;" role="alert">
            Dimensione selezionata: <strong>{{ selectedSize || 'Nessuna' }}</strong>
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
          ></app-radio-button-group>
          <div class="alert alert-success" style="margin-top: 15px;" role="alert">
            Colore selezionato: <strong>{{ selectedColor || 'Nessuno' }}</strong>
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
            [disabled]="true"
          ></app-radio-button-group>
          <p class="help-block">Questo gruppo di opzioni è disabilitato</p>
        </div>
      </div>
    </div>
  `,
})
export class App {
  selectedSize: string = '';
  selectedColor: string = '';
  selectedDisabled: string = '';

  sizeOptions = [
    { label: 'Piccolo', value: 'S' },
    { label: 'Medio', value: 'M' },
    { label: 'Grande', value: 'L' },
    { label: 'Extra Large', value: 'XL' }
  ];

  colorOptions = [
    { label: 'Rosso', value: 'red' },
    { label: 'Blu', value: 'blue' },
    { label: 'Verde', value: 'green' },
    { label: 'Giallo', value: 'yellow' }
  ];

  disabledOptions = [
    { label: 'Opzione 1', value: '1' },
    { label: 'Opzione 2', value: '2' }
  ];
}

bootstrapApplication(App);

import { Component } from '@angular/core';

interface ShippingOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'radio-button-app';

  shippingOptions: ShippingOption[] = [
    { label: 'Standard', value: 'standard' },
    { label: 'Express', value: 'express' },
    { label: 'Overnight', value: 'overnight' }
  ];

  selectedOption = this.shippingOptions[0].value;
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RadioButtonGroupComponent } from './components/radio-button-group/radio-button-group.component';

@NgModule({
  declarations: [AppComponent, RadioButtonGroupComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

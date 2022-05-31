import {NgModule} from '@angular/core';
import {KlassIndexComponent} from './klass-index.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { AddComponent } from './add/add.component';

/**
 * 班级模块
 */
@NgModule({
  declarations: [KlassIndexComponent, AddComponent],
  imports: [
    BrowserModule,
    FormsModule]
})
export class KlassModule {
}

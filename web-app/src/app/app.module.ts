import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { TeacherAddComponent } from './teacher/teacher-add/teacher-add.component';
import {FormsModule} from '@angular/forms';
import { TeacherEditComponent } from './teacher/teacher-edit/teacher-edit.component';
import {TeacherIndexComponent} from './teacher/TeacherIndex.component';
import {KlassModule} from './klass/Klass.module';

@NgModule({
  declarations: [
    AppComponent,
    TeacherIndexComponent,
    TeacherAddComponent,
    TeacherEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  // 将需要模块引入到angular中
    FormsModule,
    KlassModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

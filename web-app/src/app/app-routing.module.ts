import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeacherAddComponent} from './teacher/teacher-add/teacher-add.component';
import {TeacherEditComponent} from './teacher/teacher-edit/teacher-edit.component';
import {TeacherIndexComponent} from './teacher/TeacherIndex.component';
import {KlassIndexComponent} from './klass/klass-index.component';


const routes: Routes = [
  {
    path: 'teacher',
    component: TeacherIndexComponent
  },
  {
    path: 'teacher/add',  // path属性规定访问路径
    component: TeacherAddComponent  // component属性规定对应的组件
  },
  {
    path: 'teacher/edit/:id',
    component: TeacherEditComponent
  },
  {
    path: 'klass',
    component: KlassIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
/**
 * 实现OnInit接口，该接口规定了ngOnInit方法。
 * angular在组件准备完毕后，将自动调用ngOnInit方法
 */
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }
}

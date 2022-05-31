import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
})
export class TeacherEditComponent implements OnInit {
  public teacher: any = {};
  // private url: string;
  private id: number;
  message = '';

  /**
   * 获取与后台对接的url
   */
  getUrl(): string {
    return 'http://localhost:8080/Teacher/' + this.id;
  }

  /**
   * 当路由参数发生变化时，加载教师数据
   */
  load(): void {
    console.log('加载教师数据');
    this.httpClient.get(this.getUrl())
      .subscribe((data) => {
        this.teacher = data;
      }, () => {
        console.log(`请求 ${this.getUrl()} 时发生错误`);
      });
  }

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private appComponent: AppComponent,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.route.params.subscribe(data => {
      console.log('路由参数发生变化，接受通知');
      this.id = data.id;
      this.load();
    });
    // this.httpClient.get(this.getUrl())
    //   .subscribe((data) => {
    //     this.teacher = data;
    //   }, () => {
    //     console.log(`请求 ${this.url} 时发生错误`);
    //   });
  }

  /**
   * 显示错误信息。2秒后关闭显示
   */
  public showMessage(message = '更新数据时发生错误'): void {
    this.message = message;
    setTimeout(() => {
      message = '';
    }, 2000);
  }

  /**
   * 提交表单
   */
  public onSubmit(): void {
    this.httpClient.put(this.getUrl(), this.teacher)
      .subscribe(() => {
          console.log('更新成功');
          this.appComponent.ngOnInit();
          this.router.navigate(['./../', {relativeTo: this.route}]);
        },
        () => {
          this.showMessage('更新数据时发生错误');
          console.log(`更新数据时发生错误， url：${this.getUrl()}`);
        });
  }

}

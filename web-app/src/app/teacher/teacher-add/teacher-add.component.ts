import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from '../../app.component';
import {ActivatedRoute, Router} from '@angular/router';

/*
 * 教师添加组件
 */
@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
})
export class TeacherAddComponent implements OnInit {

  name: string;
  username: string;
  email: string;
  sex: boolean;
  message = '';

  constructor(
    private httpClient: HttpClient,
    private appComponent: AppComponent,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * 显示错误信息。2秒后关闭显示
   */
  public showMessage(message = '发生错误'): void {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 2000);
  }


  /**
   * 将要保存的教师信息提交给后台
   * 当声明方法为public（此关键字可省略）时，相当于绑定到了V层，V层中可以进行调用或是绑定操作。
   */
  public onSubmit(): void {
    const url = 'http://localhost:8080/Teacher';
    const teacher = {
      name: this.name,
      username: this.username,
      email: this.email,
      sex: this.sex
    };

    // console.log(teacher);

    this.httpClient.post(url, teacher)
      // tslint:disable-next-line:only-arrow-functions
      .subscribe(() => {
        console.log('添加成功');
        this.appComponent.ngOnInit();
        this.router.navigate(['./../'], {relativeTo: this.route});
      }, (response) => {
        this.showMessage('请求发生错误');
        console.log('请求发生错误', response);
      });
  }
}

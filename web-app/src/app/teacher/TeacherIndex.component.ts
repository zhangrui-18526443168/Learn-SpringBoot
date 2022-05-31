import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  templateUrl: './teacherIndex.component.html',
})

export class TeacherIndexComponent implements OnInit {
  // 定义教师数组
  teachers = new Array();

  // 将HttpClient对象注入到当前组件中
  constructor(private httpClient: HttpClient) {
  }

  // 该方法在组件准备完毕后被调用
  ngOnInit() {
    // const self = this;
    /* 后台数据的请求地址，若变量定义后不重新复制，则应该使用const来定义 */
    const url = 'http://localhost:8080/Teacher/';

    /* 定义success方法，用于数据请求成功后回调 */
    // tslint:disable-next-line:only-arrow-functions
    // const success = (response) => {
    //   console.log(response);
    //   /*注意：这样写是不正确的，因为this的作用域是本function，而不是本class*/
    //   // this.teacher = response;
    //   self.teachers = response;
    // };

    /* 定义error方失败法，用于数据请求后回调 */
    // tslint:disable-next-line:only-arrow-functions
    // const error = (response) => {
    //   console.log(response);
    //   console.error('请求出错,请查看');
    // };

    /* 使用get方法请求url，请求一旦成功，将调用success方法；若失败，调用error方法 */
    this.httpClient.get(url)
      .subscribe((response: any) => {
        console.log(response);
        this.teachers = response;
      }, (response => {
        console.log(response);
        console.error('请求出错,请查看');
      }));
  }

  onDelete(teacher: {id: number}): void {
    // console.log(teacher);
    const url = 'http://localhost:8080/Teacher/' + teacher.id;
    this.httpClient.delete(url)
      .subscribe(() => {
        console.log('删除成功');
        this.ngOnInit();
      }, () => {
        console.log('删除失败');
      });
  }
}

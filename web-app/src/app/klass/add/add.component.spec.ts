import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddComponent} from './add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Klass} from '../../norm/entity/Klass';

describe('Klass/AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * 测试C层向V层数据绑定
   * 在C层中使用setValue方法对表单项赋值
   * 重新渲染V层后，使用CSS选择器来获取元素
   * 获取元素的值并断言
   */
  it('测试c层向v层数据绑定：', () => {
    expect(component).toBeTruthy();
    component.name.setValue('test');
    component.teacherId.setValue(1);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const debugElement: DebugElement = fixture.debugElement;
      const nameElement = debugElement.query(By.css('#name'));
      const nameInput: HTMLInputElement = nameElement.nativeElement;
      expect(nameInput.value).toBe('test');

      const teacherIdElement = debugElement.query(By.css('#teacherId'));
      const teacherIdInput: HTMLInputElement = teacherIdElement.nativeElement;
      expect(teacherIdInput.value).toBe('1');
    });
  });

  /**
   * 测试V层向C层绑定
   * 获取V层的元素，并设置元素的值
   * 断言在C层中获取到了元素的值
   */
  it('测试v层向c层绑定：', () => {
    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
      const debugElement: DebugElement = fixture.debugElement;
      const nameElement = debugElement.query(By.css('#name'));
      const nameInput: HTMLInputElement = nameElement.nativeElement;
      nameInput.value = 'test2';
      nameInput.dispatchEvent(new Event('input'));
      expect(component.name.value).toBe('test2');

      const teacherIdElement = debugElement.query(By.css('#teacherId'));
      const teacherIdInput: HTMLInputElement = teacherIdElement.nativeElement;
      teacherIdInput.value = '2';
      teacherIdInput.dispatchEvent(new Event('input'));
      expect(component.teacherId.value).toBe(2);
    });
  });

  /**
   * 设置表单数据
   * 点击按钮发起请求
   * 断言：请求地址、请求方法、请求主体数据
   */
  it('保存按钮点击后，提交相应的http请求', () => {
    const httpTestingController = TestBed.get(HttpTestingController);
    expect(component).toBeTruthy();
    component.name.setValue('test3');
    component.teacherId.setValue('3');
    fixture.whenStable().then(() => {
      const debugElement: DebugElement = fixture.debugElement;
      const submitButtonElement = debugElement.query(By.css('button'));
      const submitButton: HTMLButtonElement = submitButtonElement.nativeElement;
      submitButton.click();

      const req = httpTestingController.expectOne('http://localhost:8080/Klass');
      expect(req.request.method).toEqual('POST');  // 断言请求方法为POST
      const klass: Klass = req.request.body.valueOf();  // 获取请求主体数据
      console.log(klass);  // 在终端及浏览器控制中打印klass数据信息
      // 断言传入教师ID
      expect(klass.name).toEqual('test3');
      expect(klass.teacher.id).toEqual(3);

      req.flush(null, {status: 201, statusText: 'Created'});
    });
  });
});

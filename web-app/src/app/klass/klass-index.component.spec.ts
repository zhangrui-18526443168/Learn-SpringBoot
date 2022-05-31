import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {KlassIndexComponent} from './klass-index.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Teacher} from '../norm/entity/Teacher';
import {Klass} from '../norm/entity/Klass';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('KlassIndexComponent', () => {
  let component: KlassIndexComponent;
  let fixture: ComponentFixture<KlassIndexComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KlassIndexComponent],
      imports: [HttpClientTestingModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(KlassIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const req = httpTestingController.expectOne('http://localhost:8080/Klass?name=');
    const klasses = [
      new Klass(1, '计科1901班', new Teacher(1, 'zhagnsan', '张三')),
      new Klass(2, '软件1902班', new Teacher(2, 'lisi', '李四'))
    ];
    req.flush(klasses);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const debugElement: DebugElement = fixture.debugElement;
      const tableElement = debugElement.query(By.css('table'));
      const nameInput: HTMLTableElement = tableElement.nativeElement;
      expect(nameInput.rows.length).toBe(3);
      expect(nameInput.rows.item(1).cells.item(1).innerText).toBe('计科1901班');
      expect(nameInput.rows.item(1).cells.item(2).innerText).toBe('张三');
    });
  });

  it('测试V层的交互操作', () => {
    component.params.name = 'test';
    fixture.detectChanges();
  });

  it('验证V层向C层绑定', () => {
    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
      const debugElement = fixture.debugElement;
      const nameInputElement = debugElement.query(By.css('input[name="name"]'));
      const nameInput: HTMLInputElement = nameInputElement.nativeElement;
      nameInput.value = 'test1';
      nameInput.dispatchEvent(new Event('input'));
      expect(component.params.name).toBe('test1');
    });
  });

  it('测试查询按钮', () => {
    expect(component).toBeTruthy();
    const name = 'hello';
    component.params.name = name;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const queryButton: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
      queryButton.click();
      const req = httpTestingController.expectOne(`http://localhost:8080/Klass?name=${name}`);
      // 模拟返回http请求的数据
      req.flush(
        [new Klass(1, 'hello班', new Teacher(1, 'zhangsan', '张三'))
      ]);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const debugElement: DebugElement = fixture.debugElement;
        const tableElement = debugElement.query(By.css('table'));
        const tableHtml: HTMLTableElement = tableElement.nativeElement;
        expect(tableHtml.rows.length).toBe(2);
      });
    });
  });
});

/**
 * 班级实体
 */
import {Teacher} from './Teacher';

export class Klass {
  id: number;
  name: string;
  teacher: Teacher;

  /**
   * 构造函数
   * @param id id
   * @param name 名称
   * @param teacher 教师
   */
  constructor(id: number, name: string, teacher: Teacher) {
    this.id = id;
    this.name = name;
    this.teacher = teacher;
  }
}

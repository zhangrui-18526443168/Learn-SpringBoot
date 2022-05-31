package com.mengyunzhi.springBootStudy.controller;

import com.mengyunzhi.springBootStudy.entity.Teacher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController  // 声明TeacherController是个控制器
@RequestMapping("Teacher")  // 声明触发该控制器的URL前缀为Teacher
@SpringBootApplication(exclude = {ErrorMvcAutoConfiguration.class})  // 禁用SpringBoot默认报错页面
public class TeacherController {
    // 用于打印日志的对象
    private final static Logger logger = LoggerFactory.getLogger(TeacherController.class.getName());

    @Autowired // 添加注解
    JdbcTemplate jdbcTemplate;  // 声明变量名称及变量类型

    @GetMapping //  声明getAll方法可通过GET方法进行请求，请求的地址为：控制器请求地址Teacher + 本方法请求地址`` = Teacher
    public List<Teacher> getAll() {
        /*初始化不固定大小的数组*/
        List<Teacher> teachers = new ArrayList<>();

        RowCallbackHandler rowCallbackHandler = new RowCallbackHandler() {
            /**
             * 该方法用于执行jdbcTemplate.query后的回调，每行数据回调1次。比如Teacher表中有两行数据，则回调此方法两次。
             * @param resultSet 查询结果，每次一行
             * @throws SQLException 查询出错时，将抛出此异常，暂时不处理。
             */
            @Override
            public void processRow(ResultSet resultSet) throws SQLException {
                Teacher teacher = new Teacher();
                /*获取字段id，并转化为Long类型返回*/
                teacher.setId(resultSet.getLong("id"));
                /*获取字段name，并转化为String类型返回*/
                teacher.setName(resultSet.getString("name"));
                /*获取字段sex，并转化为布尔类型返回*/
                teacher.setSex(resultSet.getBoolean("sex"));
                teacher.setUsername(resultSet.getString("username"));
                teacher.setEmail(resultSet.getString("email"));
                teacher.setCreateTime(resultSet.getLong("create_time"));
                teacher.setUpdateTime(resultSet.getLong("update_time"));

                /*将得到的teacher添加到要返回的数组中*/
                teachers.add(teacher);
            }
        };

        /*定义查询字符串*/
        String query = "select id, name, sex, username, email, create_time, update_time from teacher";

        /*使用query进行查询，并把查询的结果通过调用rowCallbackHandler.processRow()方法传递给rowCallbackHandler对象*/
        jdbcTemplate.query(query, rowCallbackHandler);
        return teachers;
    }

    /**
     * 新增教师
     * 1. 获取前台传入的教师对象
     * 2. 拼接插入sql语句
     * 3. 执行sql语句。
     *
     * @param teacher 教师
     */
    @PostMapping
    public void save(@RequestBody Teacher teacher) {
        String sql = String.format(
                "insert into `teacher`(`name`, `username`, `email`, `sex`) values ('%s', '%s', '%s', %s)",
                teacher.getName(), teacher.getUsername(), teacher.getEmail(), teacher.getSex().toString()
        );
        logger.info(sql);
        jdbcTemplate.execute(sql);
    }

    /**
     * 根据ID获取数据表中的教师数据并返回，用于查询某个教师的数据
     * @param id 教师ID
     * @return
     */
    @GetMapping("{id}")
    public Teacher getById(@PathVariable Long id){
        Teacher teacher = new Teacher();

        RowCallbackHandler rowCallbackHandler = new RowCallbackHandler() {
            @Override
            public void processRow(ResultSet resultSet) throws SQLException {
                teacher.setId(resultSet.getLong("id"));
                teacher.setName(resultSet.getString("name"));
                teacher.setSex(resultSet.getBoolean("sex"));
                teacher.setUsername(resultSet.getString("username"));
                teacher.setEmail(resultSet.getString("email"));
                teacher.setCreateTime(resultSet.getLong("create_time"));
                teacher.setUpdateTime(resultSet.getLong("update_time"));
            }
        };

        String query = String.format("select id, name, sex, username, email, create_time, update_time from teacher where id = %d", id);

        jdbcTemplate.query(query, rowCallbackHandler);

        return teacher;
    }

    /**
     * 根据id更新教师信息
     * @param id 教师ID
     * @param newTeacher
     */
    @PutMapping("{id}")
    public void update(@PathVariable Long id, @RequestBody Teacher newTeacher){
       String sql = String.format(
               "update `teacher` set `name` = '%s' , `username` = '%s' , `email` = '%s' , `sex` = %s where `id` = %s",
               newTeacher.getName(), newTeacher.getUsername(), newTeacher.getEmail(), newTeacher.getSex().toString(), id
       );
       this.jdbcTemplate.update(sql);
    }

    @DeleteMapping("{id}")
    @CrossOrigin("*")
    public void delete(@PathVariable Long id) {
        String sql = String.format( "delete from `teacher` where id = %s", id);
        this.jdbcTemplate.update(sql);
    }
//    public void getAll() {
//        /* 定义实现了RowCallbackHandler接口的对象*/
//        RowCallbackHandler rowCallbackHandler = new RowCallbackHandler() {
//            /**
//             * 该方法用于执行jdbcTemplate.query后的回调，每行数据回调1次。比如Teacher表中有两行数据，则回调此方法两次。
//             * @param resultSet 查询结果，每次一行
//             * @throws SQLException 查询出错时，将抛出此异常，暂时不处理。
//             */
//            @Override
//            public void processRow(ResultSet resultSet) throws SQLException {
//                logger.info("处理的结果是：" + resultSet.toString());
//            }
//        };
//
//        /*定义查询字符串*/
//        String query = "select id, name, sex, username, email, create_time, update_time from teacher";
//
//        /*使用query进行查询，并把查询的结果通过调用rowCallbackHandler.processRow()方法传递给rowCallbackHandler对象*/
//        jdbcTemplate.query(query, rowCallbackHandler);
//    }
}
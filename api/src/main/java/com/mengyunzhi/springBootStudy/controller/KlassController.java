package com.mengyunzhi.springBootStudy.controller;

import com.mengyunzhi.springBootStudy.entity.Klass;
import com.mengyunzhi.springBootStudy.repository.KlassRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 班级控制器
 */
@RestController  // 声明TeacherController是个控制器
@RequestMapping("Klass")  // 声明触发该控制器的URL前缀为Teacher
public class KlassController {
    // 用于打印日志的对象
    private final static Logger logger = LoggerFactory.getLogger(KlassController.class);

    @Autowired
    KlassRepository klassRepository;

    @GetMapping
    public List<Klass> getAll(@RequestParam String name) {
        return this.klassRepository.findAllByNameContains(name);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Klass klass) {
        klassRepository.save(klass);
    }
}

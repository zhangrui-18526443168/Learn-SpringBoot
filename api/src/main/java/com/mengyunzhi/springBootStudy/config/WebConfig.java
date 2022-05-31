package com.mengyunzhi.springBootStudy.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration  // 进行项目配置的类
@EnableWebMvc   // 将其添加到由@Configuration注解的类上，导入MVC配置信息
public class WebConfig implements WebMvcConfigurer {   // 实现WebMvcConfigurer,变更WebMvc配置信息
    @Override  // 实现接口中的方法
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // 配置CORS信息：任意请求地址
                .allowedOrigins("http://localhost:4200")  // 配置CORS信息：由http://localhost:4200发起访问的
                .allowedMethods("PUT", "DELETE", "POST", "GET", "PAT  ");  // 配置CORS信息："PUT", "DELETE", "POST", "GET", "PATCH"方法均可发起跨域访问
    }
}

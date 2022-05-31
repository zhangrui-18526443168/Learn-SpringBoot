package com.mengyunzhi.springBootStudy.controller;

import com.mengyunzhi.springBootStudy.repository.KlassRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class KlassControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    KlassRepository klassRepository;

    @Test
    public void save() throws Exception {
        String url = "/Klass";
        MockHttpServletRequestBuilder postRequest = MockMvcRequestBuilders.post(url)
                .contentType("application/json;charset=UTF-8")
                .content("{\"name\":\"测试单元测试班级\"}");

        this.mockMvc.perform(postRequest)
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().is(201));
    }
}
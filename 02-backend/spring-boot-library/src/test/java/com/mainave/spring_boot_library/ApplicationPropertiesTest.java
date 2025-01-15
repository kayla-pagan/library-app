package com.mainave.spring_boot_library;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Objects;

@SpringBootTest
public class ApplicationPropertiesTest {
    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Test
    void testDataSource() {
        assert Objects.equals(dbUrl, "jdbc:mysql://react-library-database.cl820oek4p0r.us-east-1.rds.amazonaws.com:3306/reactlibrarydatabase");
    }
}

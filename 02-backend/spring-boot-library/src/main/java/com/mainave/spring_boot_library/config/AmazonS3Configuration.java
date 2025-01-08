package com.mainave.spring_boot_library.config;

import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AmazonS3Configuration {
    public AmazonS3 amazonS3() {
        return AmazonS3ClientBuilder.standard()
                .withRegion("us-east-1")
                .withCredentials(new DefaultAWSCredentialsProviderChain())
                .build();
    }
}

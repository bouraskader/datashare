package com.data_transfer_service;

import com.arangodb.springframework.annotation.EnableArangoRepositories;
import com.data_transfer_service.configuration.JobRunrStorageConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

@Import(JobRunrStorageConfiguration.class)
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@ComponentScan("com.data_transfer_service")
@EntityScan("com.data_transfer_service.entities")
@EnableArangoRepositories("com.data_transfer_service.repository")
public class DataTransferServiceApplication {

    public static void main(String[] args) {

        SpringApplication.run(DataTransferServiceApplication.class, args);
    }
}

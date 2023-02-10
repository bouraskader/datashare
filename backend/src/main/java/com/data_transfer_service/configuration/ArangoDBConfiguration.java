package com.data_transfer_service.configuration;

import com.arangodb.ArangoDB;
import com.arangodb.springframework.annotation.EnableArangoRepositories;
import com.arangodb.springframework.config.ArangoConfiguration;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("application.properties")
@EnableArangoRepositories(basePackages = {"com.capgemini.sercel.data_transfer_service"})
@Slf4j
public class ArangoDBConfiguration implements ArangoConfiguration {


    @Value("${arangodb.hosts}")
    private String host;
    @Value("${arangodb.port}")
    private int port;
    @Value("${arangodb.user}")
    private String user;
    @Value("${arangodb.password}")
    private String password;

    @Override
    public ArangoDB.Builder arango() {
        return new ArangoDB.Builder()
                .host(host, port)
                .user(user)
                .password(password);
    }

    @Override
    public String database() {
        return "mydb";
    }
}

package com.data_transfer_service.entities;

import com.arangodb.springframework.annotation.ArangoId;
import com.arangodb.springframework.annotation.Document;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@Data
@Document("models")
public class Model {

    @Id
    @JsonIgnore
    private String modelId;

    @ArangoId
    @JsonIgnore
    private String modelArangoId;

    private String name;
    private Date lastUpdate;
    private Double healthStatus;
    private Map<String, List<String>> paramGroups;

    private Double rul;

    @Transient
    private Alert openAlert;

    @Transient
    private String failureName;
}
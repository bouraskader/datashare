package com.data_transfer_service.entities;

import com.arangodb.springframework.annotation.Document;
import com.data_transfer_service.model.ModelSimplify;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Document("filehistory")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class FileHistory {
    @Id
    @JsonIgnore
    private String id;

    private String fileName;
    private String user;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date startDate;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date endDate;
    private List<ModelSimplify> models;
    private Map<String, List<String>> parameters;
    private String status;
    private Boolean isTransferFile;

}

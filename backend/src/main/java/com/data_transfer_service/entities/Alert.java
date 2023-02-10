package com.data_transfer_service.entities;

import java.util.Date;
import java.util.UUID;

import com.data_transfer_service.enumeration.FailureStatus;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import com.arangodb.springframework.annotation.ArangoId;
import com.arangodb.springframework.annotation.Document;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@NoArgsConstructor
@Document("alerts")
public class Alert {

    @Id
    @JsonIgnore
    private String alertId;

    @ArangoId
    @JsonIgnore
    private String alertArangoId;

    @Setter(value = AccessLevel.NONE)
    private String alertUuid;

    private Date detectionDate;
    private Date closureDate;
    private String warningDescription;
    private FailureStatus failureStatus;
    @Transient
    @JsonIgnore
    private Boolean isClosed;

    private String vibratorUuid;
    private String failureUuid;

    public Alert(Date detectionDate, Date closureDate, String warningDescription,
                 FailureStatus failureStatus, String vibratorUuid, String failureUuid) {
        super();
        this.alertUuid = UUID.randomUUID().toString();
        this.detectionDate = detectionDate;
        this.closureDate = closureDate;
        this.warningDescription = warningDescription;
        this.failureStatus = failureStatus;
        this.vibratorUuid = vibratorUuid;
        this.failureUuid = failureUuid;
    }

    public Alert(Date detectionDate, Date closureDate, String warningDescription,
                 FailureStatus failureStatus, Boolean isClosed, String vibratorUuid, String failureUuid) {
        super();
        this.detectionDate = detectionDate;
        this.closureDate = closureDate;
        this.warningDescription = warningDescription;
        this.failureStatus = failureStatus;
        this.isClosed = isClosed;
        this.vibratorUuid = vibratorUuid;
        this.failureUuid = failureUuid;
    }

    public Alert(Date detectionDate, String warningDescription,
                 FailureStatus failureStatus, Boolean isClosed, String vibratorUuid, String failureUuid) {
        super();
        this.detectionDate = detectionDate;
        this.warningDescription = warningDescription;
        this.failureStatus = failureStatus;
        this.isClosed = isClosed;
        this.vibratorUuid = vibratorUuid;
        this.failureUuid = failureUuid;
    }

    public Boolean isClosed() {
        if (this.closureDate == null) {
            return false;
        }
        return true;
    }
}

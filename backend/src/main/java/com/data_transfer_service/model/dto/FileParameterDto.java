package com.data_transfer_service.model.dto;

import com.data_transfer_service.model.ModelSimplify;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileParameterDto {
    private List<ModelSimplify> model;
    private Map<String, List<String>> parameter;
    private DateUploadDto dateSelected;
    private Boolean isTransferFile;
    private String username;
}

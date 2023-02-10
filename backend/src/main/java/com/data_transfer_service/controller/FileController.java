package com.data_transfer_service.controller;

import com.data_transfer_service.entities.FileHistory;
import com.data_transfer_service.model.dto.FileParameterDto;
import com.data_transfer_service.service.ArangoDbService;
import com.data_transfer_service.service.FileService;
import org.jobrunr.scheduling.JobScheduler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.DescriptiveResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"${app.dev.frontend.local}"})
@RequestMapping(value = "/file")
public class FileController {
    private final FileService fileService;
    private final ArangoDbService arangoDbService;
    private final JobScheduler jobScheduler;

    @Autowired
    public FileController(final FileService fileService, final JobScheduler jobScheduler, final ArangoDbService arangoDbService) {
        this.fileService = fileService;
        this.jobScheduler = jobScheduler;
        this.arangoDbService = arangoDbService;
    }

    /**
     * @param body
     * @return file to download
     */
    @PostMapping(value = "/generate")
    @ResponseBody
    public ResponseEntity<Resource> downloadFileDataTransfer(@RequestBody final FileParameterDto body) {
        try {
            String userName = body.getUsername();
            boolean isTransferFile = body.getIsTransferFile();
            if (isTransferFile) {
                jobScheduler.enqueue(() -> this.fileService.generateFileAndSendToCloud(body, userName));
            } else {
                jobScheduler.enqueue(() -> this.fileService.generateFileAndDowloadToUsb(body, userName));
            }
            //jobScheduler.enqueue(() -> this.fileService.generateFile(body, userName, body.getIsTransferFile()));
            return ResponseEntity.ok().body(null);
        } catch (Exception ex) {
            ex.fillInStackTrace();
            return ResponseEntity.internalServerError().body(new DescriptiveResource("Failed to launch upload InfluxDB data and convertion into a file"));
        }
    }

    /**
     * @param fileName
     * @return file to download
     */
    @GetMapping(value = "/download")
    @ResponseBody
    public ResponseEntity<Resource> downloadFileHistoryDataTransfer(@RequestParam(name = "fileName") final String fileName) {
        try {
            FileHistory history = arangoDbService.getHistoriesByFileName(fileName);
            if (history != null) {
                //need to implement method in service and return file in controller if the job is finished
                ByteArrayResource file = fileService.popFile(history);
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                        .contentLength(file.contentLength())
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .body(file);
            }
            return ResponseEntity.badRequest().body(new DescriptiveResource("Invalid fileName"));
        } catch (Exception ex) {
            ex.fillInStackTrace();
            return ResponseEntity.internalServerError().body(new DescriptiveResource("Failed to locally load file to download"));
        }
    }

    /**
     * @return list of file history
     */
    @GetMapping(value = "/Histories")
    @ResponseBody
    public ResponseEntity<Iterable<FileHistory>> getHistories() {
        return ResponseEntity.ok().body(arangoDbService.getHistories());
    }

}

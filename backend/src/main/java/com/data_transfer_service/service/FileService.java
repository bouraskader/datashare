package com.data_transfer_service.service;

import com.data_transfer_service.entities.FileHistory;
import com.data_transfer_service.model.dto.FileParameterDto;
import com.data_transfer_service.repository.FileHistoryRepository;
import com.data_transfer_service.repository.InfluxRepository;
import lombok.extern.slf4j.Slf4j;
import org.jobrunr.jobs.annotations.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Slf4j
@Service
public class FileService implements ApplicationRunner {
    //    final ServiceManager serviceManager = DataTransferServiceApplication.serviceManager;
    @Autowired
    FileHistoryRepository historyRepository;
    @Autowired
    InfluxRepository influxRepository;

    @Value("${generatedfile.path}")
    private String folderPath;

    public void setFolderPath(String folderPath) {
        this.folderPath = folderPath;
    }

    @Job(name = "generate file")
    public void generateFile(final FileParameterDto fileToDownload, final String userName, final boolean isTransferFile) {
        FileHistory history = null;
        File newFile = null;
        // Try to initialized file
        try {
            Files.createDirectories(Paths.get(folderPath));

            // Generate a filePath
            newFile = File.createTempFile(
                    "modelAndParamFile",
                    ".txt",
                    new File(folderPath));
        } catch (Exception ex) {
            history = this.saveHistory(
                    fileToDownload,
                    userName,
                    null,
                    "Failed");
        }

        try {
            history = this.saveHistory(
                    fileToDownload,
                    userName,
                    newFile.getName(),
                    "Transfer in progress...");


            // Send file to cloud
            if (isTransferFile) {
                history.setIsTransferFile(true);

                // Save status only if file is sent to the cloud
                String status = this.sendFileToIoTCentral(newFile.getName());
                System.out.println("Send File Status" + status);
                history.setStatus(status);
            } else {
                // Save final status if file is for usb download
                history.setStatus("Available");
            }
            this.historyRepository.save(history);
        } catch (Exception ex) {
            ex.printStackTrace();
            if (history != null) {
                history.setStatus("Failed");
                this.historyRepository.save(history);
            }
            if (newFile != null) {
                try {
                    newFile.delete();
                } catch (Exception exsub) {
                    exsub.fillInStackTrace();
                }
            }
//            serviceManager.logError("fail to generateFile", ex);
        }
    }

    @Job(name = "pop file")
    public ByteArrayResource popFile(FileHistory fileHistory) {
        try {
            File folder = new File(folderPath);
            File file = new File(folder, fileHistory.getFileName());
            if (file.exists()) {
                ByteArrayResource res = new ByteArrayResource(Files.readAllBytes(file.toPath()));
                file.delete();
                fileHistory.setStatus("Downloaded");
                historyRepository.save(fileHistory);
                return res;
            }
        } catch (Exception ex) {
            ex.fillInStackTrace();
        }
        return null;
    }

    private FileHistory saveHistory(final FileParameterDto fileData, final String userName, final String filePath,
                                    final String status) {
        // TODO : Handle update (need to search by filePath)
        System.out.println(fileData.getModel());
        FileHistory.FileHistoryBuilder builder = FileHistory.builder();
        FileHistory history = builder
                .user(userName)
                .startDate(fileData.getDateSelected().getStartDate())
                .endDate(fileData.getDateSelected().getEndDate())
                .models(fileData.getModel())
                .parameters(fileData.getParameter())
                .fileName(filePath)
                .status(status)
                .isTransferFile(fileData.getIsTransferFile())
                .build();
        this.historyRepository.save(history);
        return history;
    }

    /**
     * @param filename
     */
    public String sendFileToIoTCentral(String filename) {
        String status = "";
        File folder = new File(folderPath);
        File file = new File(folder, filename);
        try {
//            serviceManager.sendFile(file.toPath());
//            serviceManager.logInfo(String.format("file %s successfully sent", file.getName()));
            return status = "File successfully sent";
        } catch (Exception e) {
            log.error("Fail to send file to XioT Central" + e);
//            serviceManager.logInfo(String.format("file %s failed to send", file.getName()));
            return status = "Failed to send file";
        }
    }

    public void generateFileAndSendToCloud(final FileParameterDto fileToDownload, final String userName)
            throws IOException {
        this.generateFile(fileToDownload, userName, true);
    }

    public void generateFileAndDowloadToUsb(final FileParameterDto fileToDownload, final String userName)
            throws IOException {
        this.generateFile(fileToDownload, userName, false);
    }

    @Override
    public void run(final ApplicationArguments args) throws Exception {

    }
}

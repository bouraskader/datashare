package com.data_transfer_service.repository;

import com.arangodb.springframework.repository.ArangoRepository;
import com.data_transfer_service.entities.FileHistory;
import org.springframework.data.repository.query.Param;

public interface FileHistoryRepository extends ArangoRepository<FileHistory, String> {
    FileHistory findByFileName(@Param("fileName") String fileName);
}

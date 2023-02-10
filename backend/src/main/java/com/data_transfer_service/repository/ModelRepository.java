package com.data_transfer_service.repository;

import com.arangodb.springframework.repository.ArangoRepository;
import com.data_transfer_service.entities.Model;

public interface ModelRepository extends ArangoRepository<Model, String> {
}

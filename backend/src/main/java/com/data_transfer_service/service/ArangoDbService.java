package com.data_transfer_service.service;

import com.data_transfer_service.entities.FileHistory;
import com.data_transfer_service.entities.Model;
import com.data_transfer_service.repository.FileHistoryRepository;
import com.data_transfer_service.repository.ModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ArangoDbService {

    @Autowired
    FileHistoryRepository historyRepository;

    @Autowired
    ModelRepository modelRepository;


    public Iterable<FileHistory> getHistories() {
        return historyRepository.findAll();
    }


    public FileHistory getHistoriesByFileName(String fileName) {
        return historyRepository.findByFileName(fileName);
    }

    public Iterable<Model> getModel() {
        return modelRepository.findAll();
    }


    public Map<String, List<String>> getParameters() {
        // TODO : Should be imported directly by Arango and not calculated like this
        Map<String, List<String>> res = new HashMap<String, List<String>>();
        Iterator<Model> vibIt = modelRepository.findAll().iterator();
        vibIt.forEachRemaining((vib) -> {
            Map<String, List<String>> vibParamsMap = vib.getParamGroups();
            vibParamsMap.keySet().forEach((key) -> {
                if (res.containsKey(key)) {
                    List<String> concat = new ArrayList<String>(vibParamsMap.get(key));
                    for (String value : res.get(key)) {
                        boolean notexistyet = true;
                        for (String concatValue : concat) {
                            if (value.compareTo(concatValue) == 0) {
                                notexistyet = false;
                                break;
                            }
                        }
                        if (notexistyet) {
                            concat.add(value);
                        }
                    }
                    res.put(key, concat);
                } else {
                    res.put(key, vibParamsMap.get(key));
                }
            });
        });
        return res;
    }
}

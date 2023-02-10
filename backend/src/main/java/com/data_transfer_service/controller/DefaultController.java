package com.data_transfer_service.controller;

import com.data_transfer_service.entities.Model;
import com.data_transfer_service.service.ArangoDbService;
import org.keycloak.adapters.springsecurity.account.SimpleKeycloakAccount;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.keycloak.representations.AccessToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@CrossOrigin(origins = {"${app.dev.frontend.local}"}, allowedHeaders = "*")
public class DefaultController {

    private final ArangoDbService arangoDbService;

    @Autowired
    public DefaultController(final ArangoDbService arangoDbService) {
        this.arangoDbService = arangoDbService;
    }

    /**
     * @return list of vibrator
     */
    @GetMapping(value = "/models")
    @ResponseBody
    public ResponseEntity<Iterable<Model>> getModels() {
        return ResponseEntity.ok().body(arangoDbService.getModel());
    }

    /**
     * @return list of vibrator
     */
    @GetMapping(value = "/parameters")
    @ResponseBody
    public ResponseEntity<Map<String, List<String>>> getParameters() {
        return ResponseEntity.ok().body(arangoDbService.getParameters());
    }

    @GetMapping(value = "/user")
    public AccessToken loadUserDetails(KeycloakAuthenticationToken authentication) {
        SimpleKeycloakAccount account = (SimpleKeycloakAccount) authentication.getDetails();
        AccessToken token = account.getKeycloakSecurityContext().getToken();
        //Username, other way
        Logger.getAnonymousLogger().info(authentication.getPrincipal().toString());
        //Email
        Logger.getAnonymousLogger().info(token.getEmail());
        return token;
    }

}

package com.app.controller;

import com.app.database.dto.response.UserInfoResponse;
import com.app.security.SecurityUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${web.prefix}/auth")
public class UserInfoController {
    @GetMapping(value = "/info")
    @ResponseBody
    public UserInfoResponse info(@AuthenticationPrincipal SecurityUser securityUser) {
        return new UserInfoResponse(securityUser.getUser().getId(), securityUser.getUser().getName());
    }
}

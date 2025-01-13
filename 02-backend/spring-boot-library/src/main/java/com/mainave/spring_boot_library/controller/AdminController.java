package com.mainave.spring_boot_library.controller;

import com.mainave.spring_boot_library.requestmodels.AddBookRequest;
import com.mainave.spring_boot_library.service.AdminService;
import com.mainave.spring_boot_library.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/secure/add/book")
    public void postBook(@RequestHeader(value = "Authorization") String token,
                         @RequestBody AddBookRequest addBookRequest) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only.");
        }
        adminService.postBook(addBookRequest);
    }

    @PostMapping("/secure/upload-url")
    public Map<String, String> getUploadUrl(@RequestHeader(value = "Authorization") String token,
                                            @RequestBody Map<String, String> payload) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only.");
        }

        String fileName = payload.get("fileName");
        String fileType = payload.get("fileType");
        String url = adminService.generatePresignedUrl(fileName, fileType);
        return Map.of("url", url);
    }
}

package com.mainave.spring_boot_library.controller;

import com.mainave.spring_boot_library.entity.Message;
import com.mainave.spring_boot_library.requestmodels.AdminQuestionRequest;
import com.mainave.spring_boot_library.service.MessageService;
import com.mainave.spring_boot_library.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@CrossOrigin({"http://localhost:5173", "http://mainavebooks.us-east-1.elasticbeanstalk.com"})
@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token,
                            @RequestBody Message messageRequest) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        messageService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value = "Authorization") String token,
                           @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");

        if(admin == null || !admin.equals("admin")) {
            throw  new Exception("Administration page only.");
        }
        messageService.putMessage(adminQuestionRequest, userEmail);
    }

    @GetMapping("/secure/generate-report")
    public ResponseEntity<ByteArrayResource> generateReport
            (@RequestHeader(value = "Authorization") String token) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")) {
            throw  new Exception("Administration page only.");
        }

        List<Message> messages = messageService.getAllMessages();
        String reportDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        StringBuilder csvReport = new StringBuilder();
        csvReport.append("Message ID,User Email, Title, Question, Admin Email, Response, Closed, Date\n");
        for(Message message : messages) {
            String response = message.getResponse() == null ? "Pending Response" : message.getResponse();
            response = response
                    .replace("\n", " ")
                    .replace("\r", "")
                    .replace("\"", "\"\"");
            String question = message.getQuestion()
                    .replace("\n", " ")
                    .replace("\r", "")
                    .replace("\"", "\"\"");

            csvReport.append(String.format("%d,%s,%s,\"%s\",%s,\"%s\",%b,%s\n",
                    message.getId(),
                    message.getUserEmail(),
                    message.getTitle(),
                    question,
                    message.getAdminEmail() == null ? "N/A" : message.getAdminEmail(),
                    response,
                    message.isClosed(),
                    reportDate));
            System.out.println(csvReport.toString());
        }

        ByteArrayResource resource = new ByteArrayResource(csvReport.toString().getBytes(StandardCharsets.UTF_8));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=messages-report.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(resource);
    }
}

package com.mainave.spring_boot_library.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.mainave.spring_boot_library.dao.BookRepository;
import com.mainave.spring_boot_library.entity.Book;
import com.mainave.spring_boot_library.requestmodels.AddBookRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URL;
import java.util.Date;

@Service
@Transactional
public class AdminService {

    private BookRepository bookRepository;

    private AmazonS3 amazonS3;

    @Autowired
    public AdminService(BookRepository bookRepository, AmazonS3 amazonS3) {
        this.bookRepository = bookRepository;
        this.amazonS3 = amazonS3;
    }

    public void postBook(AddBookRequest addBookRequest){
        Book book = new Book();
        book.setTitle(addBookRequest.getTitle());
        book.setAuthor(addBookRequest.getAuthor());
        book.setDescription(addBookRequest.getDescription());
        book.setCopies(addBookRequest.getCopies());
        book.setCopiesAvailable(addBookRequest.getCopies());
        book.setCategory(addBookRequest.getCategory());
        book.setImg(addBookRequest.getImg());
        bookRepository.save(book);
    }

    public String generatePresignedUrl(String fileName, String fileType) {
        Date expiration = new Date(System.currentTimeMillis() + 3600 * 1000);
        GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(
                "main-ave-book-images", fileName)
                    .withMethod(HttpMethod.PUT)
                    .withExpiration(expiration)
                    .withContentType(fileType);

        URL url = amazonS3.generatePresignedUrl(generatePresignedUrlRequest);
        return url.toString();
    }
}

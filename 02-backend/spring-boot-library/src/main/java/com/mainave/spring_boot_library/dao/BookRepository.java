package com.mainave.spring_boot_library.dao;

import com.mainave.spring_boot_library.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}

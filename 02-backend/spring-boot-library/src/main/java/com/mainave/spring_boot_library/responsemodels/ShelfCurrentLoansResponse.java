package com.mainave.spring_boot_library.responsemodels;

import com.mainave.spring_boot_library.entity.Book;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShelfCurrentLoansResponse {
    private final Book book;

    private final int daysLeft;

    public ShelfCurrentLoansResponse(Book book, int daysLeft) {
        this.book = book;
        this.daysLeft = daysLeft;
    }
}

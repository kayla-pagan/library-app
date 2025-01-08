package com.mainave.spring_boot_library.requestmodels;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddBookRequest {
    private String title;

    private String author;

    private String description;

    private int copies;

    private String category;

    private String img;
}

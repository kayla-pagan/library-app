package com.mainave.spring_boot_library.requestmodels;

import lombok.Getter;
import lombok.Setter;
import java.util.Optional;

@Getter
@Setter
public class ReviewRequest {
    private double rating;

    private Long bookId;

    private String reviewDescription;

    public Optional<String> getReviewDescription() {
        return Optional.ofNullable(reviewDescription);
    }
}

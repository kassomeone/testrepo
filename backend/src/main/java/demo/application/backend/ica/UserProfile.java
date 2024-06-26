package demo.application.backend.ica;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UserProfile {
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
}

package tw_Project.sweet.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@ToString
@Table(name = "VerificationCodes")
public class VerificationCode {
    @Id
    private String email;
    private String code;
    private LocalDateTime expirationTime;
}

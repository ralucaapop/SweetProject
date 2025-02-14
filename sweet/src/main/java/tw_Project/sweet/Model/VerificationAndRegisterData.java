package tw_Project.sweet.Model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VerificationAndRegisterData {
    private String name;
    private String email;
    private String password;
    private String verificationCode;
    private String dob;
}

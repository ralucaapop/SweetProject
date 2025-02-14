package tw_Project.sweet.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class VerificationAndResetPasswordData {
    String email;
    String newPassword;
    String code;
}


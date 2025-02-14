package tw_Project.sweet.Service;

import org.springframework.stereotype.Service;
import tw_Project.sweet.Model.VerificationAndResetPasswordData;

@Service
public interface VerificationCodeForgotPasswordService {
    public void sendVerificationCode(String email);
    public boolean verifyCode(VerificationAndResetPasswordData verificationAndResetPasswordData);

}

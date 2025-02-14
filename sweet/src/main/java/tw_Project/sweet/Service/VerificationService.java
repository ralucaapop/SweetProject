package tw_Project.sweet.Service;

import tw_Project.sweet.Model.VerificationAndRegisterData;

public interface VerificationService {
    public void sendVerificationCode(String email);
    public String generateVerificationCode();
    public void verifyCode(VerificationAndRegisterData verificationCode);
}

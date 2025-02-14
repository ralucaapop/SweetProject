package tw_Project.sweet.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import tw_Project.sweet.Dto.EmailDto;
import tw_Project.sweet.Dto.ForgotPasswordDto;
import tw_Project.sweet.Dto.LoginDto;
import tw_Project.sweet.Dto.UserDto;
import tw_Project.sweet.Model.User;
import tw_Project.sweet.Model.VerificationAndRegisterData;
import tw_Project.sweet.Model.VerificationAndResetPasswordData;
import tw_Project.sweet.utils.AuthenticationResponse;

import java.text.ParseException;

@Service
public interface LoginRegisterService {
    User login(LoginDto loginDto);
    void register(UserDto registerDto);
    public AuthenticationResponse registerAfterVerification(VerificationAndRegisterData verificationAndRegisterData) ;
    public void forgotPassword(@RequestBody ForgotPasswordDto forgotPasswordDto);
    public void sendVerificationCodePC(EmailDto emailDto);
    public User changePasswordAfterVerification(VerificationAndResetPasswordData verificationAndResetPasswordData);

    }

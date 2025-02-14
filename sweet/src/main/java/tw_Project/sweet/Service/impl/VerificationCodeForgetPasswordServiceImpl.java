package tw_Project.sweet.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import tw_Project.sweet.Exceptions.ResourceNotFoundException;
import tw_Project.sweet.Model.VerificationAndResetPasswordData;
import tw_Project.sweet.Model.VerificationCodePasswordChanging;
import tw_Project.sweet.Repository.VerificationCodeForgetPasswordRepository;
import tw_Project.sweet.Service.VerificationCodeForgotPasswordService;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class VerificationCodeForgetPasswordServiceImpl implements VerificationCodeForgotPasswordService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("$(spring.mail.username)")
    private String fromMsg;
    private final VerificationCodeForgetPasswordRepository verificationCodeForgetPasswordRepository;


    public VerificationCodeForgetPasswordServiceImpl(VerificationCodeForgetPasswordRepository verificationCodeForgetPasswordRepository) {
        this.verificationCodeForgetPasswordRepository = verificationCodeForgetPasswordRepository;
    }

    @Override
    public void sendVerificationCode(String email) {
        String code = generateVerificationCode();
        VerificationCodePasswordChanging verificationCode = new VerificationCodePasswordChanging();
        verificationCode.setEmail(email);
        verificationCode.setCode(code);
        verificationCode.setExpirationTime(LocalDateTime.now().plusMinutes(10)); // Codul expiră în 10 minute
        verificationCodeForgetPasswordRepository.save(verificationCode);
        sendEmail(email, code);
    }



    private void sendEmail(String email, String code) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromMsg);
        message.setTo(email);
        message.setSubject("Cod de verificare pentru resetarea parolei");
        message.setText("Codul tău de verificare este: " + code);
        mailSender.send(message);
    }

    public String generateVerificationCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);
        return String.valueOf(code);
    }
    public boolean verifyCode(VerificationAndResetPasswordData verificationAndResetPasswordData){
        Optional<VerificationCodePasswordChanging> optionalVerificationCodePasswordChanging=verificationCodeForgetPasswordRepository.getVerificationCodePasswordChangingByEmail(verificationAndResetPasswordData.getEmail());
        if(optionalVerificationCodePasswordChanging.isPresent())
        {
            VerificationCodePasswordChanging verificationCodePasswordChanging = optionalVerificationCodePasswordChanging.get();
            if(verificationCodePasswordChanging.getCode().equals(verificationAndResetPasswordData.getCode()))
            {
                verificationCodeForgetPasswordRepository.delete(verificationCodePasswordChanging);
                return true;
            }

        }
        else throw new ResourceNotFoundException("There are is no code for this email");
        return false;
    }

}

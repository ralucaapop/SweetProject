package tw_Project.sweet.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Exceptions.ResourceNotFoundException;
import tw_Project.sweet.Model.VerificationAndRegisterData;
import tw_Project.sweet.Model.VerificationCode;
import tw_Project.sweet.Repository.VerificationCodeRepository;
import tw_Project.sweet.Service.VerificationService;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class VerificationServiceImpl implements VerificationService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("$(spring.mail.username)")
    private String fromMsg;
    private final VerificationCodeRepository verificationCodeRepository;
    @Autowired
    public VerificationServiceImpl(VerificationCodeRepository verificationCodeRepository){
        this.verificationCodeRepository = verificationCodeRepository;

    }
    @Override
    public void sendVerificationCode(String email) {
        String code = generateVerificationCode();
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setEmail(email);
        verificationCode.setCode(code);
        verificationCode.setExpirationTime(LocalDateTime.now().plusMinutes(10)); // Codul expiră în 10 minute
        verificationCodeRepository.save(verificationCode);
        sendEmail(email, code);
    }

    private void sendEmail(String email, String code) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromMsg);
        message.setTo(email);
        message.setSubject("Cod de verificare");
        message.setText("Codul tău de verificare este: " + code);
        mailSender.send(message);
    }

    @Override
    public String generateVerificationCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);
        return String.valueOf(code);

    }


    public void verifyCode(VerificationAndRegisterData verificationAndRegisterData) {
        Optional<VerificationCode> optionalVerificationCode = verificationCodeRepository.getVerificationCodeByEmail(verificationAndRegisterData.getEmail());
        if (optionalVerificationCode.isPresent()) {
            VerificationCode verificationObjectFromDB = optionalVerificationCode.get();
            if (verificationAndRegisterData.getVerificationCode().equals(verificationObjectFromDB.getCode())) {
                verificationCodeRepository.delete(verificationObjectFromDB); // Șterge codul după verificare
            }
            else{
                throw new BadRequestException("The code is invalid");
            }
        }
        else{
            throw new ResourceNotFoundException("There is no code associated with this email");
        }
    }
}


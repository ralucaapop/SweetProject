package tw_Project.sweet.Service.impl;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import tw_Project.sweet.Dto.EmailDto;
import tw_Project.sweet.Dto.ForgotPasswordDto;
import tw_Project.sweet.Dto.LoginDto;
import tw_Project.sweet.Dto.UserDto;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Exceptions.ResourceNotFoundException;
import tw_Project.sweet.Model.User;
import tw_Project.sweet.Model.VerificationAndRegisterData;
import tw_Project.sweet.Model.VerificationAndResetPasswordData;
import tw_Project.sweet.Model.VerificationCodePasswordChanging;
import tw_Project.sweet.Repository.UserRepository;
import tw_Project.sweet.Repository.VerificationCodeForgetPasswordRepository;
import tw_Project.sweet.Service.LoginRegisterService;
import tw_Project.sweet.Service.VerificationCodeForgotPasswordService;
import tw_Project.sweet.Service.VerificationService;
import tw_Project.sweet.config.JwtService;
import tw_Project.sweet.utils.AuthenticationResponse;
import tw_Project.sweet.Model.enums.UserRole;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Optional;
import java.util.Random;

@Service
public class LoginRegisterServiceImpl implements LoginRegisterService {
    @Autowired
    private JavaMailSender mailSender;

    @Value("$(spring.mail.username)")
    private String fromMsg;

    private final UserRepository userRepository;
    private final VerificationService verificationService;
    private final JwtService jwtService;
    private final VerificationCodeForgetPasswordRepository verificationCodeForgetPasswordRepository;
    private final VerificationCodeForgotPasswordService verificationCodeForgotPasswordService;

    @Autowired
    public LoginRegisterServiceImpl(UserRepository userRepository, VerificationService verificationService, JwtService jwtService, VerificationCodeForgetPasswordRepository verificationCodeForgetPasswordRepository, VerificationCodeForgotPasswordService verificationCodeForgotPasswordService) {
        this.userRepository = userRepository;
        this.verificationService = verificationService;
        this.jwtService = jwtService;
        this.verificationCodeForgetPasswordRepository = verificationCodeForgetPasswordRepository;
        this.verificationCodeForgotPasswordService = verificationCodeForgotPasswordService;
    }

    @Override
    public User login(LoginDto loginDto) {
        if (loginDto.getEmail() == null || loginDto.getEmail().isBlank()) {
            throw new BadRequestException("The email is not valid");
        }
        if (loginDto.getPassword() == null || loginDto.getPassword().isBlank()) {
            throw new BadRequestException("The password is not pro");
        }

        Optional<User> patientOptional = userRepository.getUserByEmail(loginDto.getEmail());

        patientOptional.orElseThrow(() ->
                new ResourceNotFoundException("The email is not registered"));

        boolean isMatch = BCrypt.checkpw(loginDto.getPassword(), patientOptional.get().getPassword());
        if (!isMatch) {
            throw new BadRequestException("Wrong password");
        }

        return patientOptional.get();
    }

    private boolean isValidDate(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        try {
            LocalDate parsedDate = LocalDate.parse(date, formatter);
            return true;
        } catch (DateTimeParseException e) {
            return false;
        }
    }
    public void register(@RequestBody UserDto registerDto) {

        if (registerDto.getName() == null || registerDto.getName().isBlank()) {
            throw new BadRequestException("The name is invalid");
        }
        if (registerDto.getEmail() == null || registerDto.getEmail().isBlank()) {
            throw new BadRequestException("The email is invalid");
        }
        if (registerDto.getPassword() == null || registerDto.getPassword().isBlank()) {
            throw new BadRequestException("The password is invalid");
        }
        if (registerDto.getDob() == null || !isValidDate(registerDto.getDob())) {
            throw new BadRequestException("The date of birth is invalid. It must be in the format yyyy-mm-dd.");
        }
        Optional<User> patientOptional = userRepository.getUserByEmail(registerDto.getEmail());
        if (patientOptional.isPresent()) {
            throw new BadRequestException("Email already exists in db");
        }
        this.verificationService.sendVerificationCode(registerDto.getEmail());
    }

    @Override
    public AuthenticationResponse registerAfterVerification(VerificationAndRegisterData verificationAndRegisterData){
        User user = new User();
        user.setName(verificationAndRegisterData.getName());
        user.setEmail(verificationAndRegisterData.getEmail());
        user.setUserRole(UserRole.CUSTOMER);
        user.setDob(verificationAndRegisterData.getDob());
        String password = BCrypt.hashpw(verificationAndRegisterData.getPassword(), BCrypt.gensalt());
        user.setPassword(password);

        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public void forgotPassword(@RequestBody ForgotPasswordDto forgotPasswordDto){
        Optional<User> optionalUser = userRepository.getUserByEmail(forgotPasswordDto.getEmail());
        User user;
        if(optionalUser.isPresent()) {
            user = optionalUser.get();

            //if (!forgotPasswordDto.getNewPassword().equals(forgotPasswordDto.getRetypeNewPassword()))
            //    throw new BadRequestException("The passwords do not match");

            verificationCodeForgotPasswordService.sendVerificationCode(user.getEmail());
        }
    }


    public void sendVerificationCodePC(@RequestBody EmailDto emailDto){
        Optional<User> optionalUser = userRepository.getUserByEmail(emailDto.getEmail());
        User user;
        if(optionalUser.isPresent()) {
            user = optionalUser.get();
            verificationCodeForgotPasswordService.sendVerificationCode(user.getEmail());
        }
    }

    @Override
    public User changePasswordAfterVerification(VerificationAndResetPasswordData verificationAndResetPasswordData){
        Optional<User> optionalPatient = userRepository.getUserByEmail(verificationAndResetPasswordData.getEmail());
        System.out.print(verificationAndResetPasswordData.getNewPassword());
        User user;
        if(optionalPatient.isPresent()){
            user = optionalPatient.get();
            String encryptedPassword = BCrypt.hashpw(verificationAndResetPasswordData.getNewPassword(), BCrypt.gensalt());
            user.setPassword(encryptedPassword);
        }
        else{
            throw new ResourceNotFoundException("There is no account associated with this email");
        }
        return userRepository.save(user);

    }
}

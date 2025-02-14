package tw_Project.sweet.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import tw_Project.sweet.Dto.EmailDto;
import tw_Project.sweet.Dto.ForgotPasswordDto;
import tw_Project.sweet.Dto.LoginDto;
import tw_Project.sweet.Dto.UserDto;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Exceptions.ResourceNotFoundException;
import tw_Project.sweet.Model.User;
import tw_Project.sweet.Repository.UserRepository;
import tw_Project.sweet.Service.LoginRegisterService;
import tw_Project.sweet.config.JwtService;
import tw_Project.sweet.utils.ApiResponse;
import tw_Project.sweet.utils.AuthenticationResponse;


@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping(path ="/api/auth")
public class LoginRegisterController {

    private final LoginRegisterService loginRegisterService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    @Autowired
    public LoginRegisterController(LoginRegisterService loginRegisterService, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.loginRegisterService = loginRegisterService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginDto loginDto) {
        try {
            User user = loginRegisterService.login(loginDto);
            String token = jwtService.generateToken(user);
            AuthenticationResponse response = AuthenticationResponse.builder().token(token).build();
            return ResponseEntity.ok(ApiResponse.success("Welcome " + user.getName(), response));

        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400,e.getMessage()));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error(404,e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(500,"An unexpected error occurred"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody UserDto registerDto) {
        loginRegisterService.register(registerDto);
        return ResponseEntity.ok(ApiResponse.success("Code sent with success", null));
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<ApiResponse> forgotPassword(@RequestBody ForgotPasswordDto forgotPasswordDto)
    {
        loginRegisterService.forgotPassword(forgotPasswordDto);
        return ResponseEntity.ok(ApiResponse.success("The code for password resetting was sent", null));
    }

    @PostMapping("/forgot-password/send-verification-code")
    public ResponseEntity<ApiResponse> sendVerificationCode(@RequestBody EmailDto emailDto){
        loginRegisterService.sendVerificationCodePC(emailDto);
        return ResponseEntity.ok(ApiResponse.success("The code was sent successfully", null));
    }
}
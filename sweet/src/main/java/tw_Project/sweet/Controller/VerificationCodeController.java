package tw_Project.sweet.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Exceptions.ResourceNotFoundException;
import tw_Project.sweet.Model.VerificationAndRegisterData;
import tw_Project.sweet.Service.LoginRegisterService;
import tw_Project.sweet.Service.impl.VerificationServiceImpl;
import tw_Project.sweet.utils.ApiResponse;
import tw_Project.sweet.utils.AuthenticationResponse;

import java.text.ParseException;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping(path ="/api/auth/register")
public class VerificationCodeController {

    private final VerificationServiceImpl verificationService;
    private final LoginRegisterService loginRegisterService;
    @Autowired
    public VerificationCodeController(VerificationServiceImpl verificationService, LoginRegisterService loginRegisterService) {
        this.verificationService = verificationService;
        this.loginRegisterService = loginRegisterService;
    }

    @PostMapping("/verification")
    public ResponseEntity<ApiResponse> registerAfterVerification(@RequestBody VerificationAndRegisterData verificationAndRegisterData){
        try {
            verificationService.verifyCode(verificationAndRegisterData);
            AuthenticationResponse authenticationResponse = loginRegisterService.registerAfterVerification(verificationAndRegisterData);
            return ResponseEntity.ok(ApiResponse.success("Registered with success", authenticationResponse));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error(404, e.getMessage()));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, e.getMessage()));
        }
    }
}


package tw_Project.sweet.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.VerificationAndResetPasswordData;
import tw_Project.sweet.Service.LoginRegisterService;
import tw_Project.sweet.Service.VerificationCodeForgotPasswordService;
import tw_Project.sweet.utils.ApiResponse;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping(path ="/api/auth")
public class VerificationCodeForgotPasswordController {
    private final VerificationCodeForgotPasswordService verificationCodeForgotPasswordService;
    private final LoginRegisterService loginRegisterService;

    public VerificationCodeForgotPasswordController(VerificationCodeForgotPasswordService verificationCodeForgotPasswordService, LoginRegisterService loginRegisterService) {
        this.verificationCodeForgotPasswordService = verificationCodeForgotPasswordService;
        this.loginRegisterService = loginRegisterService;
    }

    @PostMapping("/ver-code")
    public ResponseEntity<ApiResponse> resetPasswordAfterVerification(@RequestBody VerificationAndResetPasswordData verificationAndResetPasswordData) {
        boolean correctCode = verificationCodeForgotPasswordService.verifyCode(verificationAndResetPasswordData);
        if (correctCode) {
            System.out.print("gasit");
            loginRegisterService.changePasswordAfterVerification(verificationAndResetPasswordData);
            return ResponseEntity.ok(ApiResponse.success("The password was successfully reset", null));
        }
        throw new BadRequestException("Incorrect code");
    }
}

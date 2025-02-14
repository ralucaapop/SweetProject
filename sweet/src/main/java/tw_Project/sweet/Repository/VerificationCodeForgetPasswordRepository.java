package tw_Project.sweet.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tw_Project.sweet.Model.VerificationCodePasswordChanging;

import java.util.Optional;

public interface VerificationCodeForgetPasswordRepository extends JpaRepository<VerificationCodePasswordChanging, String> {
    Optional<VerificationCodePasswordChanging> getVerificationCodePasswordChangingByEmail(String email);

}

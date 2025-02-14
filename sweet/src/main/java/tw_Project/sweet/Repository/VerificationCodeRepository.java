package tw_Project.sweet.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tw_Project.sweet.Model.VerificationCode;

import java.util.Optional;

@Repository
public interface VerificationCodeRepository extends JpaRepository<VerificationCode, String> {
    public Optional<VerificationCode> getVerificationCodeByEmail(String email);
    public Optional<VerificationCode> findByEmailAndCode(String email, String code);
}

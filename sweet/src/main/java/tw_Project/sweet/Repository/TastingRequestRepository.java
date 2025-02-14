package tw_Project.sweet.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tw_Project.sweet.Model.TastingRequest;

import java.util.List;

public interface TastingRequestRepository extends JpaRepository<TastingRequest, Long> {
    List<TastingRequest> findAllByEmailUser(String emailUser);
}

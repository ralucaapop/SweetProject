package tw_Project.sweet.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tw_Project.sweet.Model.Preorder;

import java.util.List;
import java.util.Optional;

@Repository
public interface PreorderRepository extends JpaRepository<Preorder, Long> {
    public Optional<Preorder> getPreordersByIdPreorder(Long idPreorder);
    List<Preorder> findAll();
}

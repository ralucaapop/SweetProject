package tw_Project.sweet.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import tw_Project.sweet.Model.Product;
import tw_Project.sweet.Model.enums.ProductType;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    public Optional<Product> getProductById(Long productId);
    public List<Product> getProductByProductType(ProductType productType);
}

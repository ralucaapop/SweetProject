package tw_Project.sweet.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tw_Project.sweet.Model.Product;
import tw_Project.sweet.Model.StockProducts;

import java.util.Optional;

public interface StockProductsRepository extends JpaRepository<StockProducts, Long> {

    Optional<StockProducts> getStockProductsByIdProductStock(Long productStockId);
    Optional<StockProducts> getStockProductsByProduct(Product product);

}

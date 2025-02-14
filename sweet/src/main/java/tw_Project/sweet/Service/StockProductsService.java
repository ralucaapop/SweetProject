package tw_Project.sweet.Service;

import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.StockProductDto;
import tw_Project.sweet.Model.Product;

import java.util.List;

@Service
public interface StockProductsService {

    public List<Product> getAllStockProducts();
    public List<StockProductDto> createStockProductDtoList(List<Product> products);
    public void updateStockQuantity(Long productStockId, int newQuantity);
    public void addNewStockProduct(Product product);
}

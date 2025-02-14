package tw_Project.sweet.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tw_Project.sweet.Dto.StockProductDto;
import tw_Project.sweet.Dto.StockQuantityDto;
import tw_Project.sweet.Model.Product;
import tw_Project.sweet.Service.StockProductsService;
import tw_Project.sweet.utils.ApiResponse;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/in/stock_products")

public class StockProductsController {

    private final StockProductsService stockProductsService;

    public StockProductsController(StockProductsService stockProductsService) {
        this.stockProductsService = stockProductsService;
    }

    @GetMapping("/getAllStockProducts")
    public ResponseEntity<ApiResponse> getAllStockProducts(){

        List<Product> allStockProducts = stockProductsService.getAllStockProducts();
        List<StockProductDto> stockProductDtos = stockProductsService.createStockProductDtoList(allStockProducts) ;
        return ResponseEntity.ok(ApiResponse.success("Those are all stock products", stockProductDtos));
    }

    @PutMapping("/changeProductStock/{stockId}")
    public ResponseEntity<ApiResponse> changeStockProduct(@PathVariable Long stockId, @RequestBody StockQuantityDto newStockQuantity){
        stockProductsService.updateStockQuantity(stockId, newStockQuantity.getQuantity());
        return ResponseEntity.ok(ApiResponse.success("Stock quantity updated successfully", null));
    }

}

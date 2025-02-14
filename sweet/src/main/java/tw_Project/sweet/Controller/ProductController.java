package tw_Project.sweet.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tw_Project.sweet.Dto.NeqTypeDto;
import tw_Project.sweet.Dto.ProductDto;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.Product;
import tw_Project.sweet.Model.StockProducts;
import tw_Project.sweet.Service.ProductService;
import tw_Project.sweet.Service.StockProductsService;
import tw_Project.sweet.utils.ApiResponse;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping(path ="/api/in/products")
public class ProductController {

    private final ProductService productService;
    private final StockProductsService stockProductsService;

    @Autowired
    public ProductController(ProductService productService, StockProductsService stockProductsService) {
        this.productService = productService;
        this.stockProductsService = stockProductsService;
    }

    @PostMapping("/addProduct")
    public ResponseEntity<ApiResponse> addNewProduct
            ( @RequestParam("name") String name,
              @RequestParam("price") double price,
              @RequestParam("calories") String calories,
              @RequestParam("descriptions") String descriptions,
              @RequestParam("ingredients") String ingredients,
              @RequestParam("type") String type,
              @RequestParam("category") String category,
              @RequestParam("productImgFile") MultipartFile productImgFile){
        try {
            ProductDto productDto = new ProductDto();
            productDto.setName(name);
            productDto.setCalories(calories);
            productDto.setType(type);
            productDto.setCategory(category);
            productDto.setPrice(price);
            productDto.setIngredients(ingredients);
            productDto.setDescriptions(descriptions);
            Product product = productService.addNewProduct(productDto, productImgFile);
            if(productDto.getType().equals("STOCK")|| productDto.getType().equals("MIX")){
                stockProductsService.addNewStockProduct(product);
            }
            return ResponseEntity.ok(ApiResponse.success("New Product Added successfully", null));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error(403, "Failed to save product"));
        }
        }

    @PostMapping("/updateProduct/{productId}")
    public ResponseEntity<ApiResponse> updateProduct(@PathVariable Long productId, @RequestBody ProductDto productDto) throws IOException {
        productService.updateProduct(productId, productDto);
        System.out.print("CONFIRM");
        return ResponseEntity.ok(ApiResponse.success("Product updated successfully", null));
    }

    @DeleteMapping("/deleteProduct/{productId}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long productId){
        productService.deleteProduct(productId);
        return ResponseEntity.ok(ApiResponse.success("Product deleted successfully", null));
    }

    @GetMapping("/getProduct/{productId}")
    public ResponseEntity<ApiResponse> getProduct(@PathVariable Long productId){
        try{
        Product product = productService.getProduct(productId);
        return ResponseEntity.ok(ApiResponse.success("Get product successfully", product));}
        catch(BadRequestException e){
            return ResponseEntity.badRequest().body(ApiResponse.error(400,e.getMessage()));
        }
    }

    @GetMapping("/getProducts")
    public ResponseEntity<ApiResponse> getProducts(){
        List<Product> products = productService.getProducts();
        return ResponseEntity.ok(ApiResponse.success("Get all products successfully", products));
    }

    @PutMapping("/archiveProduct/{productId}")
    public ResponseEntity<ApiResponse> archiveProduct(@PathVariable Long productId){
        productService.archiveProduct(productId);
        return ResponseEntity.ok(ApiResponse.success("Product archived successfully", null));
    }

    @PutMapping("/activateProduct/{productId}")
    public ResponseEntity<ApiResponse> activateProduct(@PathVariable Long productId){
        productService.activateProduct(productId);
        return ResponseEntity.ok(ApiResponse.success("Product activated successfully", null));
    }

    @PutMapping("/changeProductType/{productId}")
    public ResponseEntity<ApiResponse> changeProductType(@PathVariable Long productId, @RequestBody NeqTypeDto newType){
        productService.changeProductType(productId, newType.getNewType());
        return ResponseEntity.ok(ApiResponse.success("Product type changed successfully", null));
    }
}

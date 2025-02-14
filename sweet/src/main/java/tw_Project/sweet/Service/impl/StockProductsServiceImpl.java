package tw_Project.sweet.Service.impl;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.StockProductDto;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.Product;
import tw_Project.sweet.Model.StockProducts;
import tw_Project.sweet.Model.enums.ProductType;
import tw_Project.sweet.Repository.ProductRepository;
import tw_Project.sweet.Repository.StockProductsRepository;
import tw_Project.sweet.Service.StockProductsService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StockProductsServiceImpl implements StockProductsService {

    private final StockProductsRepository stockProductsRepository;
    private final ProductRepository productRepository;

    @Autowired
    public StockProductsServiceImpl(StockProductsRepository stockProductsRepository, ProductRepository productRepository) {
        this.stockProductsRepository = stockProductsRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllStockProducts() {
        List<Product> stockProducts = productRepository.getProductByProductType(ProductType.STOCK);
        List<Product> mixProducts = productRepository.getProductByProductType(ProductType.MIX);
        stockProducts.addAll(mixProducts);
        return stockProducts;
    }

    @Override
    public List<StockProductDto> createStockProductDtoList(List<Product> products) {
        List<StockProductDto> stockProductDtos = new ArrayList<>();
        for(Product product : products){
            StockProductDto stockProductDto = new StockProductDto();
            stockProductDto.setIngredients(product.getIngredients());
            stockProductDto.setDescriptions(product.getDescriptions());
            stockProductDto.setPrice(product.getPrice());
            stockProductDto.setCalories(product.getCalories());
            stockProductDto.setName(product.getName());
            stockProductDto.setCategory(String.valueOf(product.getProductCategory()));
            stockProductDto.setProductId(product.getId());
            stockProductDto.setProductImgUrl(product.getProductImgUrl());
            Optional<StockProducts> optionalStockProducts = stockProductsRepository.getStockProductsByProduct(product);
            if(optionalStockProducts.isPresent()){
                StockProducts stockProducts = optionalStockProducts.get();
                stockProductDto.setAvailableQuantity(stockProducts.getRealQuantity());
                stockProductDto.setStockId(stockProducts.getIdProductStock());
                stockProductDtos.add(stockProductDto);
            }
            else{
                throw new BadRequestException("There is no product in stock with this id");
            }
        }
        return  stockProductDtos;
    }

    @Override
    public void updateStockQuantity(Long productStockId, int newQuantity) {
        Optional<StockProducts> optionalStockProducts = stockProductsRepository.getStockProductsByIdProductStock(productStockId);
        if(optionalStockProducts.isPresent()){
            System.out.print(newQuantity);
           StockProducts stockProducts = optionalStockProducts.get();
           stockProducts.setRealQuantity(newQuantity);
           stockProductsRepository.save(stockProducts);
        }
        else{
            throw new BadRequestException("There is no product in stock with this id");
        }
    }

    @Override
    public void addNewStockProduct(Product product) {
          StockProducts stockProducts = new StockProducts();
          stockProducts.setRealQuantity(0);
          stockProducts.setProduct(product);
          stockProductsRepository.save(stockProducts);
    }
}

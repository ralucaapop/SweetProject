package tw_Project.sweet.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.CartDto;
import tw_Project.sweet.Dto.UserCartProductDto;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.CartItem;
import tw_Project.sweet.Model.Product;
import tw_Project.sweet.Model.StockProducts;
import tw_Project.sweet.Model.enums.ProductCartStatus;
import tw_Project.sweet.Model.User;
import tw_Project.sweet.Repository.CartRepository;
import tw_Project.sweet.Repository.ProductRepository;
import tw_Project.sweet.Repository.StockProductsRepository;
import tw_Project.sweet.Repository.UserRepository;
import tw_Project.sweet.Service.CartService;
import tw_Project.sweet.Service.StockProductsService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final StockProductsRepository stockProductsRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository, UserRepository userRepository, ProductRepository productRepository, StockProductsRepository stockProductsRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.stockProductsRepository = stockProductsRepository;
    }

    public void addProductToCart(CartDto cartDto){
        CartItem cart = new CartItem();
        User user;
        Product product;
        Optional<User> userOptional = userRepository.getUserByEmail(cartDto.getUserEmail());
        if(userOptional.isPresent()){
            user = userOptional.get();
            Optional<Product> optionalProduct = productRepository.getProductById(cartDto.getProductId());

            if(optionalProduct.isPresent()){
                product = optionalProduct.get();
                Optional<StockProducts> optionalStockProducts = stockProductsRepository.getStockProductsByProduct(product);
                if(optionalStockProducts.isPresent())
                {
                    StockProducts stockProducts = optionalStockProducts.get();
                    if(stockProducts.getRealQuantity()>=1){
                        //stockProducts.setRealQuantity(stockProducts.getRealQuantity()-1);
                        //stockProductsRepository.save(stockProducts);

                        Optional<CartItem> optionalExistingProductInCart = cartRepository.getCartByProductAndUser(product, user);
                        if(optionalExistingProductInCart.isPresent()){
                            CartItem existingProductInCart = optionalExistingProductInCart.get();
                            if(existingProductInCart.getProductCartStatus().equals(ProductCartStatus.CART))
                            {
                                existingProductInCart.setQuantity(existingProductInCart.getQuantity()+1);
                                cartRepository.save(existingProductInCart);
                            }
                            else{
                                cart.setProduct(product);
                                cart.setUser(user);
                                cart.setQuantity(1);
                                cart.setProductCartStatus(ProductCartStatus.CART);
                                cartRepository.save(cart);
                            }
                        }
                        else{
                            cart.setProduct(product);
                            cart.setUser(user);
                            cart.setQuantity(1);
                            cart.setProductCartStatus(ProductCartStatus.CART);
                            cartRepository.save(cart);
                        }

                    }
                    else{
                        throw new BadRequestException("This product is out of stock");
                    }
                }
                else{
                    throw new BadRequestException("This product is not in stock category");
                }
            }
            else{
                throw new BadRequestException("There is no product with this id");
            }
        }
        else{
            throw new BadRequestException("There is no account associated with this email");
        }
    }

    public void deleteProductFromCart(Long productCartId){
        CartItem cart;
        Optional<CartItem> optionalCart = cartRepository.getCartByIdProductCart(productCartId);
        if(optionalCart.isPresent()){
            cart = optionalCart.get();
            cartRepository.delete(cart);
        }else{
            throw new BadRequestException("There is no product cart with this id");
        }
    }

    public void changeProductQuantityInCart(Long productCartId, CartDto cartDto){
        CartItem cart;
        Optional<CartItem> optionalCart = cartRepository.getCartByIdProductCart(productCartId);
        if(optionalCart.isPresent()){
            cart = optionalCart.get();
            Optional<StockProducts> optionalStockProducts = stockProductsRepository.getStockProductsByProduct(cart.getProduct());
            if(optionalStockProducts.isPresent()){
                StockProducts stockProducts = optionalStockProducts.get();
                if(cartDto.getQuantity()>cart.getQuantity()){
                    if(!checkStockQuantity(cart.getProduct(), cartDto.getQuantity()-cart.getQuantity())){
                          throw new BadRequestException("the stock is not enough");
                      }
                  }
                  cart.setQuantity(cartDto.getQuantity());
                  cartRepository.save(cart);

              }else{
                  throw new BadRequestException("There is no product stock with this id");
              }
        }else{
            throw new BadRequestException("There is no product cart with this id");
        }
    }

    public boolean checkStockQuantity(Product product, int newQuantity ){
        Optional<StockProducts> optionalStockProducts = stockProductsRepository.getStockProductsByProduct(product);
        if(optionalStockProducts.isPresent()){
            StockProducts stockProducts = optionalStockProducts.get();
            if(stockProducts.getRealQuantity() >= newQuantity)
                return true;
            return false;
        }else{
            throw new BadRequestException("There is no product stock with this id");
        }
    }

    @Override
    public List<CartItem> getUserProductsCart(String userEmail) {
        User user;
        List<CartItem> cartProducts;
        Optional<User> userOptional = userRepository.getUserByEmail(userEmail);
        if(userOptional.isPresent()){
            user = userOptional.get();
            cartProducts = cartRepository.getAllByUserAndProductCartStatus(user, ProductCartStatus.CART);
            return cartProducts;
        }
        else{
            throw new BadRequestException("There is no account associated with this email");
        }
    }

    public List<UserCartProductDto> createListCartProducts(List<CartItem> cartProducts){
        List<UserCartProductDto> userCartProductDtoList = new ArrayList<>();

        for(CartItem cart: cartProducts)
        {
            UserCartProductDto userCartProductDto = new UserCartProductDto();
            Product product = cart.getProduct();
            Double productPrice = product.getPrice();
            userCartProductDto.setQuantity(cart.getQuantity());
            userCartProductDto.setPrice(productPrice*cart.getQuantity());
            userCartProductDto.setProductId(product.getId());
            userCartProductDto.setProductCartId(cart.getIdProductCart());
            userCartProductDto.setProductName(product.getName());
            userCartProductDto.setPhotoFilePath(product.getProductImgUrl());
            userCartProductDtoList.add(userCartProductDto);
        }
        return userCartProductDtoList;
    }

    @Override
    public boolean verifyCartItemStatus(Long cartId) {
        CartItem cart;
        Optional<CartItem> optionalCart = cartRepository.getCartByIdProductCart(cartId);
        if(optionalCart.isPresent()){
            cart = optionalCart.get();
            Product product = cart.getProduct();
            Optional<StockProducts> optionalStockProducts = stockProductsRepository.getStockProductsByProduct(product);
            if(optionalStockProducts.isPresent()){
                StockProducts stockProducts = optionalStockProducts.get();
                if(stockProducts.getRealQuantity() >= cart.getQuantity())
                    return true;
                return false;
            }else{
                throw new BadRequestException("There is no product stock with this id");
            }
        }else{
            throw new BadRequestException("There is no product cart with this id");
        }
    }
}

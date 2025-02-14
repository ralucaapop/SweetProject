package tw_Project.sweet.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tw_Project.sweet.Dto.CartDto;
import tw_Project.sweet.Dto.UserCartProductDto;
import tw_Project.sweet.Model.CartItem;
import tw_Project.sweet.Service.CartService;
import tw_Project.sweet.utils.ApiResponse;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping( path ="api/in/user/cart")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/addProductToCart")

    public ResponseEntity<ApiResponse> addProductToCart(@RequestBody CartDto cartDto) {
       
        cartService.addProductToCart(cartDto);
        return ResponseEntity.ok(ApiResponse.success("Product added to cart successfully", null));
    }


    @PutMapping("/updateProductQuantity/{productCartId}")
    public ResponseEntity<ApiResponse> updateProductQuantityInCart(@RequestBody CartDto cartDto, @PathVariable Long productCartId) {
        cartService.changeProductQuantityInCart(productCartId, cartDto);
        return ResponseEntity.ok(ApiResponse.success("Product quantity changed successfully", null));
    }

    @DeleteMapping("/deleteProductFromCart/{productCartId}")
    public ResponseEntity<ApiResponse> updateProductFromCart(@PathVariable Long productCartId) {
        cartService.deleteProductFromCart(productCartId);
        return ResponseEntity.ok(ApiResponse.success("Product deleted from cart successfully", null));
    }

    @GetMapping("/get_user_cart_products/{userEmail}")
    public ResponseEntity<ApiResponse> getUserCartProducts(@PathVariable  String userEmail){
        List<CartItem> carts = cartService.getUserProductsCart(userEmail);
        List<UserCartProductDto> userCartProductDto = cartService.createListCartProducts(carts);
        return ResponseEntity.ok(ApiResponse.success("User cart products extracted successfully", userCartProductDto));
    }


    @GetMapping("/verifyCartItemStatus/{cartItemId}")
    public ResponseEntity<ApiResponse> verifyCartItemStatus(@PathVariable Long cartItemId){
        boolean availableCartItem = cartService.verifyCartItemStatus(cartItemId);
        return ResponseEntity.ok(ApiResponse.success("Cart product availability checked",availableCartItem));
    }

}

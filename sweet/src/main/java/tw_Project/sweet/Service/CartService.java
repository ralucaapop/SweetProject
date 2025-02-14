package tw_Project.sweet.Service;

import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.CartDto;
import tw_Project.sweet.Dto.UserCartProductDto;
import tw_Project.sweet.Model.CartItem;
import tw_Project.sweet.Model.PreorderItemList;

import java.util.List;

@Service
public interface CartService {
    public void addProductToCart(CartDto cartDto);
    public void deleteProductFromCart(Long productCartId);
    public void changeProductQuantityInCart(Long productCartId, CartDto cartDto);

    public List<CartItem> getUserProductsCart(String userEmail);

    public List<UserCartProductDto> createListCartProducts(List<CartItem> cartProducts);

    public boolean verifyCartItemStatus(Long cartId);


}

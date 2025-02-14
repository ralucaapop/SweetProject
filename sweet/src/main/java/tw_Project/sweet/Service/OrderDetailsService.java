package tw_Project.sweet.Service;

import tw_Project.sweet.Model.CartItem;
import tw_Project.sweet.Model.Order;

public interface OrderDetailsService {
    public void addOrderDetailsService(Long orderId, Long cartItemId );

    public void updateStock(CartItem cart, Order order);
}

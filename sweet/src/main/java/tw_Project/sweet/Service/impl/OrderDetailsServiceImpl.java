package tw_Project.sweet.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.*;
import tw_Project.sweet.Model.enums.PreorderItemStatus;
import tw_Project.sweet.Model.enums.ProductCartStatus;
import tw_Project.sweet.Repository.*;
import tw_Project.sweet.Service.OrderDetailsService;

import java.util.Optional;


@Service
public class OrderDetailsServiceImpl implements OrderDetailsService{
    private final OrderRepository orderRepository;
    private final OrderDetailsRepository orderDetailsRepository;
    private final CartRepository cartRepository;
    private final StockProductsRepository stockProductsRepository;

    @Autowired
    public OrderDetailsServiceImpl(OrderRepository orderRepository, OrderDetailsRepository orderDetailsRepository, CartRepository cartRepository, StockProductsRepository stockProductsRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.cartRepository = cartRepository;
        this.stockProductsRepository = stockProductsRepository;
    }


    @Override
    public void addOrderDetailsService(Long orderId, Long cartItemId) {
        OrderDetails orderDetails = new OrderDetails();
        Optional<CartItem> cartItem = cartRepository.getCartByIdProductCart(cartItemId);
        Optional<Order> optionalOrder = orderRepository.getOrderByIdOrder(orderId);
        if(optionalOrder.isPresent()){
            Order order = optionalOrder.get();
            if(cartItem.isPresent())
            {
                CartItem cartItem1 = cartItem.get();
                orderDetails.setOrder(order);
                orderDetails.setCartItem(cartItem1);
                try{
                    orderDetailsRepository.save(orderDetails);
                    cartItem1.setProductCartStatus(ProductCartStatus.ORDER);
                    cartRepository.save(cartItem1);
                }catch (Exception e){
                    orderRepository.delete(order);
                    throw new BadRequestException("An error occurred");
                }
            }else{
                orderRepository.delete(order);
                throw new BadRequestException("There is no order list item with this id");
            }
        }
        else{
            throw new BadRequestException("There is no order with this id");
        }
    }

    @Override
    public void updateStock(CartItem cart, Order order) {
        Optional<StockProducts> optionalStockProducts = stockProductsRepository.getStockProductsByProduct(cart.getProduct());
        if(optionalStockProducts.isPresent()){
            StockProducts stockProducts = optionalStockProducts.get();
            if(stockProducts.getRealQuantity()-cart.getQuantity()>=0)
            {stockProducts.setRealQuantity(stockProducts.getRealQuantity()-cart.getQuantity());
            stockProductsRepository.save(stockProducts);}
            else{
                orderRepository.delete(order);
                String errorMessage = "";
                if(stockProducts.getRealQuantity()-cart.getQuantity()<=0)
                    errorMessage ="This product is no longer in stock";
                else
                    errorMessage="The maximum available quantity is" + stockProducts.getRealQuantity() ;
                throw new BadRequestException(errorMessage);
            }
        }else{
            throw new BadRequestException("There is no product stock with this id");
        }
    }
}

package tw_Project.sweet.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tw_Project.sweet.Dto.DisplayOrdersDto;
import tw_Project.sweet.Dto.OrderDto;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.CartItem;
import tw_Project.sweet.Model.Order;
import tw_Project.sweet.Model.enums.ProductCartStatus;
import tw_Project.sweet.Service.*;
import tw_Project.sweet.utils.ApiResponse;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping( "api/in/user/order")
public class OrderController {
    private final OrderService orderService;
    private final OrderDetailsService orderDetailsService;
    private final CartService cartService;

    public OrderController(OrderService orderService, OrderDetailsService orderDetailsService, CartService cartService) {
        this.orderService = orderService;
        this.orderDetailsService = orderDetailsService;
        this.cartService = cartService;
    }

    @PostMapping("/addOrder/{userEmail}")
    public ResponseEntity<ApiResponse> AddOrder(@RequestBody OrderDto orderDto, @PathVariable String userEmail){
        Order order = orderService.addNewOrder(orderDto);
        Long orderId = order.getIdOrder();
        boolean existing_intems = false;
        List<CartItem> cartItems = cartService.getUserProductsCart(userEmail);
        for(CartItem cartItem: cartItems) {
            if(cartItem.getProductCartStatus().equals(ProductCartStatus.CART)) {
                orderDetailsService.updateStock(cartItem, order);
                orderDetailsService.addOrderDetailsService(orderId, cartItem.getIdProductCart());
                existing_intems = true;
            }
        }
        if(!existing_intems){
            orderService.deleteOrder(orderId);
            throw new BadRequestException("The cart is empty");
        }
        return ResponseEntity.ok(ApiResponse.success("New order added successfully", null));
    }

    @PostMapping("/change_order_status/{orderId}/{orderStatus}")
    public ResponseEntity<ApiResponse> changeOrderStatus(@PathVariable Long orderId,@PathVariable String orderStatus ){
        orderService.changeOrderStatus(orderId, orderStatus);
        return ResponseEntity.ok(ApiResponse.success("Order status changed successfully", null));
    }

    @GetMapping("/get_all_orders")
    public ResponseEntity<ApiResponse> getAllOrders(){
        List<DisplayOrdersDto> displayOrdersDtos = orderService.getAllOrders();
        return ResponseEntity.ok(ApiResponse.success("All orders", displayOrdersDtos));
    }
}

package tw_Project.sweet.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tw_Project.sweet.Model.Product;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DisplayOrdersDto {
    Long orderId;
    private Long addressId;
    Double price;
    String orderStatus;
    String phoneNumber;
    String deliveryMethod;
    String dateAndTime;
    String addressVal;
    List<ProductOrderDto> products;
}

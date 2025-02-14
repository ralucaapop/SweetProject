package tw_Project.sweet.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDto {
    private Long addressId;
    String deliveryMethod;
    String dateAndTime;
    String orderStatus;
    String phoneNumber;
    Double price;
}

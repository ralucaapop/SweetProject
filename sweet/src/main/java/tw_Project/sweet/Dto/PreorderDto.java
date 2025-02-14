package tw_Project.sweet.Dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PreorderDto {
    private Long addressId;
    Double price;
    String deliveryMessage;
    String deliveryMethod;
    String dateAndTime;
    String phoneNumber;
}

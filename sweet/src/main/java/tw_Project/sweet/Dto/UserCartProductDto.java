package tw_Project.sweet.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserCartProductDto {
    private String productName;
    private String photoFilePath;
    private Long productId;
    private Long productCartId;
    private int Quantity;
    private Double price;
}

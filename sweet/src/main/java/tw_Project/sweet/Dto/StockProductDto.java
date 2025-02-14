package tw_Project.sweet.Dto;

import com.azure.core.annotation.Get;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StockProductDto {
    private Long productId;
    private Long stockId;
    private String ingredients;
    private String descriptions;
    private String calories;
    private Double price;
    private String productImgUrl;
    private String category;
    private String name;
    private int availableQuantity;
}

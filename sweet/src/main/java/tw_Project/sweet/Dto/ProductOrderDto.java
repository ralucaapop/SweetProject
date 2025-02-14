package tw_Project.sweet.Dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tw_Project.sweet.Model.enums.ProductCategory;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductOrderDto {
    private Long id;
    private String name;
    private String ingredients;
    private String descriptions;
    private String calories;
    private Double price;
    private String productImgUrl;
    private int quantity;
    @Enumerated(EnumType.STRING)
    private ProductCategory productCategory;

}

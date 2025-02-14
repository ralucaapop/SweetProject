package tw_Project.sweet.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tw_Project.sweet.Model.enums.ProductCategory;
import tw_Project.sweet.Model.enums.ProductStatus;
import tw_Project.sweet.Model.enums.ProductType;

@Entity
@Table (name ="products")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String ingredients;
    private String descriptions;
    private String calories;
    private Double price;
    private String productImgUrl;

    @Enumerated(EnumType.STRING)
    private ProductCategory productCategory;

    @Enumerated(EnumType.STRING)
    private ProductStatus productStatus;

    @Enumerated(EnumType.STRING)
    private ProductType productType;

}

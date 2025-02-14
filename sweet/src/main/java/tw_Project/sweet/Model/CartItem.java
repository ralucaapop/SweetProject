package tw_Project.sweet.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tw_Project.sweet.Model.enums.ProductCartStatus;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="cart_products")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProductCart;

    @ManyToOne
    @JoinColumn(name="fk_user_email")
    private User user;

    @ManyToOne
    @JoinColumn(name="fk_product_id")
    private Product product;

    private int quantity;

    @Enumerated(EnumType.STRING)
    private ProductCartStatus productCartStatus;

}

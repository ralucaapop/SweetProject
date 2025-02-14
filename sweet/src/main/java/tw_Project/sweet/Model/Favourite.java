package tw_Project.sweet.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="favourite_products")
public class Favourite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProductFavourite;

    @ManyToOne
    @JoinColumn(name="fk_user_email")
    private User user;

    private int quantity;

    @ManyToOne
    @JoinColumn(name="fk_product_id")
    private Product product;
}

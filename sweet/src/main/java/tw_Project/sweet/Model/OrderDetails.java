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
@Table(name="order-details")
public class OrderDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idOrderDetails;

    @ManyToOne
    @JoinColumn(name="fk_order_id")
    private Order order;

    @OneToOne
    @JoinColumn(name="fk_cart_item")
    private CartItem cartItem;
}

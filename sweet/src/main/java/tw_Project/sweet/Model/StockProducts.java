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
@Table(name="stock_products")
public class StockProducts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idProductStock;

    @OneToOne()
    @JoinColumn(name="fk_product_id")
    private Product product;
    int realQuantity;
}

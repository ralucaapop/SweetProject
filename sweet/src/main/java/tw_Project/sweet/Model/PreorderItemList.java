package tw_Project.sweet.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tw_Project.sweet.Model.enums.PreorderItemStatus;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="preorders_items_lists")
public class PreorderItemList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idPreorder;

    @ManyToOne
    @JoinColumn(name="fk_user_email")
    private User user;

    @ManyToOne
    @JoinColumn(name="fk_product_id")
    private Product product;

    private int quantity;
    private String observations;

    @Enumerated(EnumType.STRING)
    private PreorderItemStatus preorderItemStatus;
}

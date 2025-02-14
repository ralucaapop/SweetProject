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
@Table(name="preorder-details")
public class PreorderDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idPreorderDetails;

    @ManyToOne
    @JoinColumn(name="fk_preorder_id")
    private Preorder preorder;

    @OneToOne
    @JoinColumn(name="fk_preorder_item")
    private PreorderItemList preorderItemList;

}

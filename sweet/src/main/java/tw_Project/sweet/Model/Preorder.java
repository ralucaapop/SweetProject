package tw_Project.sweet.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tw_Project.sweet.Model.enums.DeliveryMethod;
import tw_Project.sweet.Model.enums.OrderStatus;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="preorders")
public class Preorder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idPreorder;

    @ManyToOne
    @JoinColumn(name="fk_address_id")
    private Address address;

    Double price;
    String deliveryMessage;
    @Enumerated(EnumType.STRING)
    DeliveryMethod deliveryMethod;
    String dateAndTime;
    @Enumerated(EnumType.STRING)
    OrderStatus orderStatus;
}

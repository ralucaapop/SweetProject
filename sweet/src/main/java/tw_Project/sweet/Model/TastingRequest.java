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
@Table(name = "tasting_requests")
public class TastingRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long tastingRequestId;

    private String emailUser;
    private String eventType;
    private int guestNumber;
    private String eventDate;
    private String phoneNumber;
}

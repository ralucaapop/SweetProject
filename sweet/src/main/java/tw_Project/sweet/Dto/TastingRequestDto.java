package tw_Project.sweet.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TastingRequestDto {
    Long tastingRequestId;
    private String emailUser;
    private String eventType;
    private int guestNumber;
    private String eventDate;
    private String phoneNumber;
}

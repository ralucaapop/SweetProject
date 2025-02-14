package tw_Project.sweet.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TastingResponceDto {
    public String email;
    public String message;
    public String response;
    public Long tastingRequestId;
}

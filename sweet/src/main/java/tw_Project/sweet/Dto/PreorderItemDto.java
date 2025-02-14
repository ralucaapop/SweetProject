package tw_Project.sweet.Dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PreorderItemDto {
    private Long productId;
    private int quantity;
    private String userEmail;
    private String observations;
}

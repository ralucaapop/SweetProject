package tw_Project.sweet.Dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddressDto {
    String address;
    String userEmail;
    String phoneNumber;
    Long addressId;
}

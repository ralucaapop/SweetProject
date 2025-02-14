package tw_Project.sweet.Controller;
import com.azure.core.annotation.Get;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tw_Project.sweet.Dto.AddressDto;
import tw_Project.sweet.Model.Address;
import tw_Project.sweet.Service.AddressService;
import tw_Project.sweet.utils.ApiResponse;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping( "api/in/address")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/getAllClientAddresses/{clientEmail}")
    public ResponseEntity<ApiResponse> getAllClientAddresses(@PathVariable String clientEmail){
        List<AddressDto> addressDtoList = new ArrayList<>();
        List<Address> addressList = addressService.getAllClientsAddresses(clientEmail);
        for(Address address: addressList){
            AddressDto addressDto = new AddressDto();
            addressDto.setAddress(address.getAddress());
            addressDto.setUserEmail(address.getUser().getEmail());
            addressDto.setPhoneNumber(address.getPhoneNumber());
            addressDto.setAddressId(address.getAddressId());
            addressDtoList.add(addressDto);
        }
        return ResponseEntity.ok(ApiResponse.success("All client addresses are successfully extracted", addressDtoList));
    }

    @PostMapping("/addNewAddress")
    public ResponseEntity<ApiResponse> addNewAddress(@RequestBody AddressDto addressDto){
        addressService.addAddress(addressDto);
        return ResponseEntity.ok(ApiResponse.success("New address added successfully", null));
    }

    @DeleteMapping("/deleteAddress/{addressId}")
    public ResponseEntity<ApiResponse> deleteAddress(@PathVariable Long addressId){
        addressService.deleteAddress(addressId);
        return ResponseEntity.ok(ApiResponse.success("Address deleted successfully", null));
    }

    @GetMapping("/getAddressById/{addressId}")
    public ResponseEntity<ApiResponse> getAddressById(@PathVariable Long addressId){
        Address address = addressService.getAddressById(addressId);
        AddressDto addressDto = new AddressDto();
        addressDto.setAddress(address.getAddress());
        addressDto.setUserEmail(address.getUser().getEmail());
        addressDto.setPhoneNumber(address.getPhoneNumber());
        return ResponseEntity.ok(ApiResponse.success("Address successfully", addressDto));
    }
}

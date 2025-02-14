package tw_Project.sweet.Service;

import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.AddressDto;
import tw_Project.sweet.Model.Address;

import java.util.List;

@Service
public interface AddressService {

    public void addAddress(AddressDto addressDto);
    public List<Address> getAllClientsAddresses(String clientEmail);
    public void deleteAddress(Long addressId);
    public Address getAddressById(Long addressId);
}

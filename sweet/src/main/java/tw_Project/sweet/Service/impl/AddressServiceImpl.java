package tw_Project.sweet.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.AddressDto;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.Address;
import tw_Project.sweet.Model.User;
import tw_Project.sweet.Repository.AddressRepository;
import tw_Project.sweet.Repository.UserRepository;
import tw_Project.sweet.Service.AddressService;
import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    @Autowired
    public AddressServiceImpl(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void addAddress(AddressDto addressDto) {
        Address address = new Address();
        address.setAddress(addressDto.getAddress());
        address.setPhoneNumber(addressDto.getPhoneNumber());

        Optional<User> optionalUser = userRepository.getUserByEmail(addressDto.getUserEmail());
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            address.setUser(user);
            addressRepository.save(address);
        }
        else{
            throw new BadRequestException("There is no account associated with this email");
        }
    }

    @Override
    public List<Address> getAllClientsAddresses(String clientEmail) {
        Optional<User> optionalUser = userRepository.getUserByEmail(clientEmail);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            List<Address> addresses = addressRepository.findAllByUser(user);
            return addresses;
        }
        throw new BadRequestException("There is no account associated with this email");
    }

    @Override
    public void deleteAddress(Long addressId) {
        Address clientAddresses;
        Optional<Address> optionalAddress = addressRepository.getAddressesByAddressId(addressId);
        if(optionalAddress.isPresent()){
            clientAddresses = optionalAddress.get();
            addressRepository.delete(clientAddresses);
        }
        else{
            throw new BadRequestException("There is no address with this id");
        }
    }

    public Address getAddressById(Long addressId){
        Address clientAddresses;
        Optional<Address> optionalAddress = addressRepository.getAddressesByAddressId(addressId);
        if(optionalAddress.isPresent()){
            clientAddresses = optionalAddress.get();
            return clientAddresses;
        }
        else{
            throw new BadRequestException("There is no address with this id");
        }
    }

}

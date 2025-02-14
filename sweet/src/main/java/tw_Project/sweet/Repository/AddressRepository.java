package tw_Project.sweet.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tw_Project.sweet.Model.Address;
import tw_Project.sweet.Model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    public Optional<Address> getAddressesByAddressId(Long addressId);
    public List<Address> findAllByUser(User user);

}

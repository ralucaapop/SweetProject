package tw_Project.sweet.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.DisplayOrdersDto;
import tw_Project.sweet.Dto.PreorderDto;
import tw_Project.sweet.Dto.ProductOrderDto;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.*;
import tw_Project.sweet.Model.enums.DeliveryMethod;
import tw_Project.sweet.Model.enums.OrderStatus;
import tw_Project.sweet.Repository.AddressRepository;
import tw_Project.sweet.Repository.PreorderDetailsRepository;
import tw_Project.sweet.Repository.PreorderRepository;
import tw_Project.sweet.Repository.UserRepository;
import tw_Project.sweet.Service.PreorderService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PreorderServiceImpl implements PreorderService {
    private final PreorderRepository preorderRepository;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final PreorderDetailsRepository preorderDetailsRepository;


    @Autowired
    public PreorderServiceImpl(PreorderRepository preorderRepository, AddressRepository addressRepository, UserRepository userRepository, PreorderDetailsRepository preorderDetailsRepository) {
        this.preorderRepository = preorderRepository;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.preorderDetailsRepository = preorderDetailsRepository;
    }

    @Override
    public Preorder addNewPreorder(PreorderDto preorderDto) {
        Preorder preorder = new Preorder();

        if(preorderDto.getDeliveryMethod().equals("COURIER"))
        {Optional<Address> optionalAddress = addressRepository.getAddressesByAddressId(preorderDto.getAddressId());
        if(optionalAddress.isPresent()){
            Address address = optionalAddress.get();
            preorder.setAddress(address);
            preorder.setDateAndTime(preorderDto.getDateAndTime());
            preorder.setDeliveryMethod(DeliveryMethod.valueOf(preorderDto.getDeliveryMethod()));
            preorder.setDeliveryMessage(preorderDto.getPhoneNumber());
            preorder.setPrice(preorderDto.getPrice());
            preorder.setOrderStatus(OrderStatus.ARRIVED);
            return preorderRepository.save(preorder);
        }
        else{
            throw new BadRequestException("There is no address with this id");
        }
        }
        else{
            preorder.setDateAndTime(preorderDto.getDateAndTime());
            preorder.setDeliveryMethod(DeliveryMethod.valueOf(preorderDto.getDeliveryMethod()));
            preorder.setDeliveryMessage(preorderDto.getPhoneNumber());
            preorder.setPrice(preorderDto.getPrice());
            preorder.setOrderStatus(OrderStatus.ARRIVED);

            return preorderRepository.save(preorder);
        }
    }

    @Override
    public void deletePreorder(Long preorderId) {
        Optional<Preorder> optionalPreorder = preorderRepository.getPreordersByIdPreorder(preorderId);
        if(optionalPreorder.isPresent()){
            Preorder preorder = optionalPreorder.get();
            preorderRepository.delete(preorder);
        }
        else{
            throw new BadRequestException("There is no preorder with this id");
        }
    }

    @Override
    public void changeOrderStatus(Long preorderId, String newStatus) {
        Optional<Preorder> optionalOrder = preorderRepository.getPreordersByIdPreorder(preorderId);
        if(optionalOrder.isPresent()){
            Preorder preorder = optionalOrder.get();
            preorder.setOrderStatus(OrderStatus.valueOf(newStatus));
            preorderRepository.save(preorder);
        }
        else{
            throw new BadRequestException("There is no order with this id");
        }
    }

    @Override
    public List<DisplayOrdersDto> getAllPreorders() {
        List<Preorder> preorders = preorderRepository.findAll();
        List<DisplayOrdersDto> displayOrdersDtos = new ArrayList<>();
        for(Preorder preorder: preorders)
        {
            DisplayOrdersDto displayOrdersDto =  new DisplayOrdersDto();
            if(preorder.getDeliveryMethod().equals(DeliveryMethod.COURIER))
            {
                Optional<Address> address = addressRepository.getAddressesByAddressId(preorder.getAddress().getAddressId());
                if(address.isPresent())
                {
                    displayOrdersDto.setAddressVal(address.get().getAddress());
                    displayOrdersDto.setAddressId(address.get().getAddressId());
                }
            }

            displayOrdersDto.setPrice(preorder.getPrice());
            displayOrdersDto.setOrderId(preorder.getIdPreorder());
            displayOrdersDto.setPhoneNumber(preorder.getDeliveryMessage());
            displayOrdersDto.setDeliveryMethod(preorder.getDeliveryMethod().toString());
            displayOrdersDto.setDateAndTime(preorder.getDateAndTime());
            displayOrdersDto.setOrderStatus(String.valueOf(preorder.getOrderStatus()));

            List<ProductOrderDto> orderProducts = new ArrayList<>();
            List<PreorderDetails> preorderDetails = preorderDetailsRepository.findAllByPreorder(preorder);

            for(PreorderDetails preorderDetail: preorderDetails){
                PreorderItemList preorderItemList = preorderDetail.getPreorderItemList();
                Product product = preorderItemList.getProduct();

                ProductOrderDto productOrderDto = new ProductOrderDto();
                productOrderDto.setId(product.getId());
                productOrderDto.setName(product.getName());
                productOrderDto.setDescriptions(product.getDescriptions());
                productOrderDto.setProductCategory(product.getProductCategory());
                productOrderDto.setProductImgUrl(product.getProductImgUrl());
                productOrderDto.setQuantity(preorderItemList.getQuantity());
                productOrderDto.setPrice(product.getPrice());

                orderProducts.add(productOrderDto);
            }
            displayOrdersDto.setProducts(orderProducts);
            displayOrdersDtos.add(displayOrdersDto);

        }
        return displayOrdersDtos;
    }

}

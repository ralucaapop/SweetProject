package tw_Project.sweet.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.PreorderItemDto;
import tw_Project.sweet.Dto.UserCartProductDto;
import tw_Project.sweet.Dto.UserPreorderItemInListDto;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.*;
import tw_Project.sweet.Model.enums.PreorderItemStatus;
import tw_Project.sweet.Repository.PreorderItemRepository;
import tw_Project.sweet.Repository.ProductRepository;
import tw_Project.sweet.Repository.UserRepository;
import tw_Project.sweet.Service.PreorderItemService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PreorderItemServiceImpl implements PreorderItemService {

    private final PreorderItemRepository preorderItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Autowired
    public PreorderItemServiceImpl(PreorderItemRepository preorderItemRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.preorderItemRepository = preorderItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void addProductToPreorderList(PreorderItemDto preorderItemDto) {
        PreorderItemList preorderItemList = new PreorderItemList();
        User user;
        Product product;
        Optional<User> userOptional = userRepository.getUserByEmail(preorderItemDto.getUserEmail());
        if(userOptional.isPresent()){
            user = userOptional.get();
            Optional<Product> optionalProduct = productRepository.getProductById(preorderItemDto.getProductId());
            if(optionalProduct.isPresent()){
                product = optionalProduct.get();

                //now wee need to check if the product is already in preorder list
                Optional<PreorderItemList> optionalExistingProductInPreorderList = preorderItemRepository.getPreorderItemListByProductAndUser(product, user);
                PreorderItemList existingProductInCart;
                if(optionalExistingProductInPreorderList.isPresent()){
                    existingProductInCart = optionalExistingProductInPreorderList.get();
                    if(existingProductInCart.getPreorderItemStatus().equals(PreorderItemStatus.LIST))
                    {
                        existingProductInCart.setQuantity(existingProductInCart.getQuantity()+1);
                        preorderItemRepository.save(existingProductInCart);
                    }
                    else{
                        preorderItemList.setProduct(product);
                        preorderItemList.setUser(user);
                        preorderItemList.setObservations(preorderItemDto.getObservations());
                        preorderItemList.setQuantity(1);
                        preorderItemList.setPreorderItemStatus(PreorderItemStatus.LIST);
                        preorderItemRepository.save(preorderItemList);
                    }
                }
                else{
                    preorderItemList.setProduct(product);
                    preorderItemList.setUser(user);
                    preorderItemList.setObservations(preorderItemDto.getObservations());
                    preorderItemList.setQuantity(1);
                    preorderItemList.setPreorderItemStatus(PreorderItemStatus.LIST);
                    preorderItemRepository.save(preorderItemList);
                }
            }
            else{
                throw new BadRequestException("There is no product with this id");
            }
        }
        else{
            throw new BadRequestException("There is no account associated with this email");
        }
    }

    @Override
    public void deleteProductFromPreorderList(Long productPreorderId) {
        PreorderItemList preorderItemList;
        Optional<PreorderItemList> optionalPreorderItemList = preorderItemRepository.getPreorderItemListByIdPreorder(productPreorderId);
        if(optionalPreorderItemList.isPresent()){
            preorderItemList = optionalPreorderItemList.get();
            preorderItemRepository.delete(preorderItemList);
        }else{
            throw new BadRequestException("There is no product cart with this id");
        }
    }

    @Override
    public void changeProductQuantityInPreorderList(Long productPreorderId, PreorderItemDto preorderItemDto) {
        PreorderItemList preorderItemList;
        Optional<PreorderItemList> optionalPreorderItemList = preorderItemRepository.getPreorderItemListByIdPreorder(productPreorderId);
        if(optionalPreorderItemList.isPresent()){
            preorderItemList = optionalPreorderItemList.get();

            preorderItemList.setQuantity(preorderItemDto.getQuantity());
            preorderItemRepository.save(preorderItemList);
        }else{
            throw new BadRequestException("There is no product in preorder list with this id");
        }
    }

    @Override
    public List<PreorderItemList> getUserProductsPreorderList(String userEmail) {
        User user;
        List<PreorderItemList> preorderItemLists;
        Optional<User> userOptional = userRepository.getUserByEmail(userEmail);
        if(userOptional.isPresent()){
            user = userOptional.get();
            preorderItemLists = preorderItemRepository.getAllByUserAndPreorderItemStatus(user, PreorderItemStatus.LIST);
            return preorderItemLists;
        }
        else{
            throw new BadRequestException("There is no account associated with this email");
        }
    }

    @Override
    public List<UserPreorderItemInListDto> createListPreorderList(List<PreorderItemList> preorderItemLists) {
        List<UserPreorderItemInListDto> userPreorderProductsDtoList = new ArrayList<>();
        for(PreorderItemList preorderItemList: preorderItemLists)
        {
            UserPreorderItemInListDto preorderItemDto = new UserPreorderItemInListDto();
            Product product = preorderItemList.getProduct();
            Double productPrice = product.getPrice();
            preorderItemDto.setQuantity(preorderItemList.getQuantity());
            preorderItemDto.setPrice(productPrice*preorderItemList.getQuantity());
            preorderItemDto.setProductId(product.getId());
            preorderItemDto.setProductCartId(preorderItemList.getIdPreorder());
            preorderItemDto.setProductName(product.getName());
            preorderItemDto.setPhotoFilePath(product.getProductImgUrl());
            userPreorderProductsDtoList.add(preorderItemDto);
        }
        return userPreorderProductsDtoList;
    }
}

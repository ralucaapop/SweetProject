package tw_Project.sweet.Service.impl;

import org.aspectj.apache.bcel.classfile.Module;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.FavouriteDto;
import tw_Project.sweet.Dto.FavouriteItemDto;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.Favourite;
import tw_Project.sweet.Model.PreorderItemList;
import tw_Project.sweet.Model.Product;
import tw_Project.sweet.Model.User;
import tw_Project.sweet.Repository.FavouriteRepository;
import tw_Project.sweet.Repository.ProductRepository;
import tw_Project.sweet.Repository.UserRepository;
import tw_Project.sweet.Service.FavouriteService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FavouriteServiceImpl implements FavouriteService {

    private final FavouriteRepository favouriteRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Autowired
    public FavouriteServiceImpl(FavouriteRepository favouriteRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.favouriteRepository = favouriteRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void addNewFavouriteItems(FavouriteDto favouriteDto) {
        Favourite favourite = new Favourite();
        System.out.print(favouriteDto.getUserEmail());
        Optional<Product> product = productRepository.getProductById(favouriteDto.getProductId());
        if(product.isPresent()){
            favourite.setProduct(product.get());
            Optional<User> user = userRepository.getUserByEmail(favouriteDto.getUserEmail());
            if(user.isPresent()){
                favourite.setUser(user.get());
                favourite.setQuantity(1);
                favouriteRepository.save(favourite);
            }else{
                throw new BadRequestException("This email does not correspond to any user");
            }
        }else{
            throw new BadRequestException("This id does not correspond to any product in db");
        }
    }

    public List<FavouriteItemDto> getAllFavouriteUser(String email){
        List<FavouriteItemDto> favouriteDtos = new ArrayList<>();
        Optional<User> user = userRepository.getUserByEmail(email);
        if(user.isPresent()){
            List<Favourite> favourites = favouriteRepository.getAllByUser(user.get());
            for(Favourite favourite :favourites){
                FavouriteItemDto favouriteDto = new FavouriteItemDto();
                favouriteDto.setProductId(favourite.getProduct().getId());
                Product product = favourite.getProduct();
                favouriteDto.setProductName(product.getName());
                favouriteDto.setPrice(product.getPrice());
                favouriteDto.setPhotoFilePath(product.getProductImgUrl());
                favouriteDto.setQuantity(favourite.getQuantity());
                favouriteDto.setProductFavouriteId(favourite.getIdProductFavourite());
                favouriteDtos.add(favouriteDto);

            }
        }else{
            throw new BadRequestException("This email does not correspond to any user");
        }
        return favouriteDtos;
    }

    @Override
    public void deleteItem(Long id) {
        Optional<Favourite> optional = favouriteRepository.findById(id);
        if(optional.isPresent())
        {
            favouriteRepository.delete(optional.get());
        }
        else{
            throw new BadRequestException("this item does not exists");
        }
    }

    @Override
    public void changeProductQuantityInFavList(FavouriteDto favouriteDto, Long id) {
        Favourite favourite;
        Optional<Favourite> optionalFavourite = favouriteRepository.getFavouriteByIdProductFavourite(id);
        if(optionalFavourite.isPresent()){
            favourite = optionalFavourite.get();

            favourite.setQuantity(favouriteDto.getQuantity());
            favouriteRepository.save(favourite);
        }else{
            throw new BadRequestException("There is no product in preorder list with this id");
        }
    }

}

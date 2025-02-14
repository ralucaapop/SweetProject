package tw_Project.sweet.Service;

import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.FavouriteDto;
import tw_Project.sweet.Dto.FavouriteItemDto;

import java.util.List;

@Service
public interface FavouriteService {
    public void addNewFavouriteItems(FavouriteDto favouriteDto);
    public List<FavouriteItemDto> getAllFavouriteUser(String email);
    public void deleteItem(Long id);
    public void changeProductQuantityInFavList(FavouriteDto favouriteDto, Long id);
}

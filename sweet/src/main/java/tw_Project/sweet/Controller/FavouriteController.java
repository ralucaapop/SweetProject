package tw_Project.sweet.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tw_Project.sweet.Dto.FavouriteDto;
import tw_Project.sweet.Dto.FavouriteItemDto;
import tw_Project.sweet.Dto.PreorderItemDto;
import tw_Project.sweet.Service.FavouriteService;
import tw_Project.sweet.utils.ApiResponse;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping( "api/in/user/favourite")
public class FavouriteController {

    private final FavouriteService favouriteService;

    public FavouriteController(FavouriteService favouriteService) {
        this.favouriteService = favouriteService;
    }

    @GetMapping("/getAllUserFavourite/{userEmail}")
    public ResponseEntity<ApiResponse> getAllUserFavourite(@PathVariable String userEmail){
        List<FavouriteItemDto> favouriteDtos = favouriteService.getAllFavouriteUser(userEmail);
        return ResponseEntity.ok(ApiResponse.success("All user Favourites", favouriteDtos));
    }

    @PostMapping("/addNewProductToFavourite")
    public ResponseEntity<ApiResponse> addNewFavouriteProduct(@RequestBody FavouriteDto favouriteDto){
        favouriteService.addNewFavouriteItems(favouriteDto);
        return ResponseEntity.ok(ApiResponse.success("New item added to favourite successfully", null));
    }

    @DeleteMapping("/deleteProductFromFavourite/{favId}")
    public ResponseEntity<ApiResponse> removeFavProduct(@PathVariable Long favId){
        favouriteService.deleteItem(favId);
        return ResponseEntity.ok(ApiResponse.success("favourite item deleted successfully", null));

    }
    @PutMapping("/updateProductQuantity/{productFavId}")
    public ResponseEntity<ApiResponse> updateProductQuantityInPreorderList(@RequestBody FavouriteDto favItemDto, @PathVariable Long productFavId) {
        favouriteService.changeProductQuantityInFavList(favItemDto, productFavId);
        return ResponseEntity.ok(ApiResponse.success("Product quantity changed successfully", null));
    }
}


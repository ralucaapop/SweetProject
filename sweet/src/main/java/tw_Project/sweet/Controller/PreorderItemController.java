package tw_Project.sweet.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tw_Project.sweet.Dto.PreorderItemDto;
import tw_Project.sweet.Dto.UserPreorderItemInListDto;
import tw_Project.sweet.Model.PreorderItemList;
import tw_Project.sweet.Service.PreorderItemService;
import tw_Project.sweet.utils.ApiResponse;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping( "api/in/user/preorder_item")
public class PreorderItemController {
    private final PreorderItemService preorderItemService;

    public PreorderItemController(PreorderItemService preorderItemService) {
        this.preorderItemService = preorderItemService;
    }

    @PostMapping("/add_item_to_preorder_list")
    public ResponseEntity<ApiResponse> addItemToPreorderList(@RequestBody PreorderItemDto preorderItemDto){
        preorderItemService.addProductToPreorderList(preorderItemDto);
        return ResponseEntity.ok(ApiResponse.success("", null));
    }

    @PutMapping("/updateProductQuantity/{productPreorderId}")
    public ResponseEntity<ApiResponse> updateProductQuantityInPreorderList(@RequestBody PreorderItemDto preorderItemDto, @PathVariable Long productPreorderId) {
        preorderItemService.changeProductQuantityInPreorderList(productPreorderId, preorderItemDto);
        return ResponseEntity.ok(ApiResponse.success("Product quantity changed successfully", null));
    }

    @DeleteMapping("/deleteProductFromPreorderList/{productPreorderId}")
    public ResponseEntity<ApiResponse> deleteProductFromPreorderList(@PathVariable Long productPreorderId) {
        preorderItemService.deleteProductFromPreorderList(productPreorderId);
        return ResponseEntity.ok(ApiResponse.success("Product deleted from preorder list successfully", null));
    }

    @GetMapping("/get_user_preorder_products/{userEmail}")
    public ResponseEntity<ApiResponse> getUserCartProducts(@PathVariable  String userEmail){
        List<PreorderItemList> preorderItemsList = preorderItemService.getUserProductsPreorderList(userEmail);
        List<UserPreorderItemInListDto> userCartProductDto = preorderItemService.createListPreorderList(preorderItemsList);
        return ResponseEntity.ok(ApiResponse.success("User cart products extracted successfully", userCartProductDto));
    }

}

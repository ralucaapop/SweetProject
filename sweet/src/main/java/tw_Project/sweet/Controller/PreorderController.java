package tw_Project.sweet.Controller;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tw_Project.sweet.Dto.DisplayOrdersDto;
import tw_Project.sweet.Dto.PreorderDto;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.Preorder;
import tw_Project.sweet.Model.PreorderItemList;
import tw_Project.sweet.Model.enums.PreorderItemStatus;
import tw_Project.sweet.Service.PreorderDetailsService;
import tw_Project.sweet.Service.PreorderItemService;
import tw_Project.sweet.Service.PreorderService;
import tw_Project.sweet.utils.ApiResponse;

import java.util.List;


@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping( "api/in/user/preorder")
public class PreorderController {
    private final PreorderService preorderService;
    private final PreorderDetailsService preorderDetailsService;
    private final PreorderItemService preorderItemService;

    public PreorderController(PreorderService preorderService, PreorderDetailsService preorderDetailsService, PreorderItemService preorderItemService) {
        this.preorderService = preorderService;
        this.preorderDetailsService = preorderDetailsService;
        this.preorderItemService = preorderItemService;
    }

    @PostMapping("/addPreorder/{userEmail}")
    public ResponseEntity<ApiResponse> AddPreorder(@RequestBody PreorderDto preorderDto, @PathVariable String userEmail){
        Preorder preorder = preorderService.addNewPreorder(preorderDto);

        Long preorderId = preorder.getIdPreorder();

        boolean existing_intems = false;
        List<PreorderItemList> preorderItemLists = preorderItemService.getUserProductsPreorderList(userEmail);
        for(PreorderItemList preorderItemList: preorderItemLists) {
            if(preorderItemList.getPreorderItemStatus().equals(PreorderItemStatus.LIST)) {
                preorderDetailsService.addPreorderDetailsService(preorderId, preorderItemList.getIdPreorder());
                existing_intems = true;
            }
            }
        if(!existing_intems){
            preorderService.deletePreorder(preorderId);
            throw new BadRequestException("The preorder list is empty");
        }
        return ResponseEntity.ok(ApiResponse.success("New preorder added successfully", null));
    }

    @PostMapping("/change_preorder_status/{preorderId}/{orderStatus}")
    public ResponseEntity<ApiResponse> changePreorderStatus(@PathVariable Long preorderId,@PathVariable String orderStatus ){
        preorderService.changeOrderStatus(preorderId, orderStatus);
        return ResponseEntity.ok(ApiResponse.success("Order status changed successfully", null));
    }

    @GetMapping("/get_all_preorders")
    public ResponseEntity<ApiResponse> getAllOrders(){
        List<DisplayOrdersDto> displayOrdersDtos = preorderService.getAllPreorders();
        return ResponseEntity.ok(ApiResponse.success("All preorders", displayOrdersDtos));
    }
}

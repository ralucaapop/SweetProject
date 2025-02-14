package tw_Project.sweet.Service;

import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.CartDto;
import tw_Project.sweet.Dto.PreorderItemDto;
import tw_Project.sweet.Dto.UserCartProductDto;
import tw_Project.sweet.Dto.UserPreorderItemInListDto;
import tw_Project.sweet.Model.CartItem;
import tw_Project.sweet.Model.PreorderItemList;

import java.util.List;

@Service
public interface PreorderItemService {

    public void addProductToPreorderList(PreorderItemDto preorderItemDto);
    public void deleteProductFromPreorderList(Long productPreorderId);
    public void changeProductQuantityInPreorderList(Long productPreorderId, PreorderItemDto preorderItemDto);

    public List<PreorderItemList> getUserProductsPreorderList(String userEmail);

    public List<UserPreorderItemInListDto> createListPreorderList(List<PreorderItemList> cartProducts);
}

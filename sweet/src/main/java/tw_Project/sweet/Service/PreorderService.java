package tw_Project.sweet.Service;

import org.apache.catalina.LifecycleState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import tw_Project.sweet.Dto.DisplayOrdersDto;
import tw_Project.sweet.Dto.PreorderDto;
import tw_Project.sweet.Model.Preorder;
import tw_Project.sweet.Repository.PreorderRepository;

import java.util.List;

@Service
public interface PreorderService {
   public Preorder addNewPreorder(@RequestBody PreorderDto preorderDto);
   public void deletePreorder(Long preorderId);

   public void changeOrderStatus(Long preorderId, String newStatus);
   public List<DisplayOrdersDto> getAllPreorders();
}

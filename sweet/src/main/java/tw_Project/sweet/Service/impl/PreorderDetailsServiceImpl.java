package tw_Project.sweet.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.Preorder;
import tw_Project.sweet.Model.PreorderDetails;
import tw_Project.sweet.Model.PreorderItemList;
import tw_Project.sweet.Model.enums.PreorderItemStatus;
import tw_Project.sweet.Repository.PreorderDetailsRepository;
import tw_Project.sweet.Repository.PreorderItemRepository;
import tw_Project.sweet.Repository.PreorderRepository;
import tw_Project.sweet.Service.PreorderDetailsService;

import java.util.Optional;

@Service
public class PreorderDetailsServiceImpl implements PreorderDetailsService {

    private final PreorderRepository preorderRepository;
    private final PreorderDetailsRepository preorderDetailsRepository;
    private final PreorderItemRepository preorderItemRepository;

    @Autowired
    public PreorderDetailsServiceImpl(PreorderRepository preorderRepository, PreorderDetailsRepository preorderDetailsRepository, PreorderItemRepository preorderItemRepository) {
        this.preorderRepository = preorderRepository;
        this.preorderDetailsRepository = preorderDetailsRepository;
        this.preorderItemRepository = preorderItemRepository;
    }


    @Override
    public void addPreorderDetailsService(Long preorderId, Long preorderItemId) {
        PreorderDetails preorderDetails = new PreorderDetails();
        Optional<PreorderItemList> preorderItemListOptional = preorderItemRepository.getPreorderItemListByIdPreorder(preorderItemId);
        Optional<Preorder> optionalPreorder = preorderRepository.getPreordersByIdPreorder(preorderId);
        if(optionalPreorder.isPresent()){
            Preorder preorder = optionalPreorder.get();
            if(preorderItemListOptional.isPresent())
            {
                PreorderItemList preorderItemList = preorderItemListOptional.get();
                preorderDetails.setPreorder(preorder);
                preorderDetails.setPreorderItemList(preorderItemList);
                try{
                preorderDetailsRepository.save(preorderDetails);
                preorderItemList.setPreorderItemStatus(PreorderItemStatus.PREORDER);
                preorderItemRepository.save(preorderItemList);
                }catch (Exception e){
                    preorderRepository.delete(preorder);
                    throw new BadRequestException("An error occurred");
                }
            }else{
                preorderRepository.delete(preorder);
                throw new BadRequestException("There is no preorder list item with this id");
            }
        }
        else{
            throw new BadRequestException("There is no preorder with this id");
        }
    }
}

package tw_Project.sweet.Service;

import tw_Project.sweet.Dto.TastingRequestDto;
import tw_Project.sweet.Dto.TastingResponceDto;
import tw_Project.sweet.Model.TastingRequest;

import java.util.List;

public interface TastingRequestService {
    public void addNewRequest(TastingRequestDto tastingRequestDto);
    public List<TastingRequest> getAllTastingsRequests();
    public List<TastingRequest>getAllUserRequests(String userEmail);
    public void sendResponse(TastingResponceDto tastingResponceDto);
}

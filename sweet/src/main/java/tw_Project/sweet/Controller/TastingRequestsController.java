package tw_Project.sweet.Controller;


import com.azure.spring.cloud.autoconfigure.implementation.aad.configuration.properties.AadApplicationType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tw_Project.sweet.Dto.TastingRequestDto;
import tw_Project.sweet.Dto.TastingResponceDto;
import tw_Project.sweet.Model.TastingRequest;
import tw_Project.sweet.Service.TastingRequestService;
import tw_Project.sweet.utils.ApiResponse;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/in/tastingRequest")
public class TastingRequestsController {
    private final TastingRequestService tastingRequestService;

    public TastingRequestsController(TastingRequestService tastingRequestService) {
        this.tastingRequestService = tastingRequestService;
    }

    @PostMapping("/addNewRequest")
    public ResponseEntity<ApiResponse>addNewRequest(@RequestBody TastingRequestDto tastingRequestDto){
        tastingRequestService.addNewRequest(tastingRequestDto);
        return ResponseEntity.ok(ApiResponse.success("New Request added successfully", null));
    }

    @GetMapping("/getAllRequests")
    public ResponseEntity<ApiResponse>getAllRequests(){
        List<TastingRequest> tastingRequestList = tastingRequestService.getAllTastingsRequests();
        return ResponseEntity.ok(ApiResponse.success("All tasting requests", tastingRequestList));
    }

    @GetMapping("/getAllClientRequest/{clientEmail}")
    public ResponseEntity<ApiResponse>getAllClientRequests(@PathVariable String clientEmail){
        List<TastingRequest> tastingRequestList = tastingRequestService.getAllUserRequests(clientEmail);
        return ResponseEntity.ok(ApiResponse.success("All client tasting request", tastingRequestList));
    }

    @PostMapping("/response-request")
    public ResponseEntity<ApiResponse>acceptClientRequest(@RequestBody TastingResponceDto tastingResponceDto){
        tastingRequestService.sendResponse(tastingResponceDto);
        return ResponseEntity.ok(ApiResponse.success("The response was successfully sent to client",null));
    }

}

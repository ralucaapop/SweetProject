package tw_Project.sweet.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.TastingRequestDto;
import tw_Project.sweet.Dto.TastingResponceDto;
import tw_Project.sweet.Model.TastingRequest;
import tw_Project.sweet.Model.User;
import tw_Project.sweet.Repository.TastingRequestRepository;
import tw_Project.sweet.Service.TastingRequestService;

import java.util.List;
import java.util.Optional;

@Service
public class TastingRequestServiceImpl implements TastingRequestService {


    private final TastingRequestRepository tastingRequestRepository;
    @Autowired
    private JavaMailSender mailSender;

    @Value("$(spring.mail.username)")
    private String fromMsg;


    @Autowired
    public TastingRequestServiceImpl(TastingRequestRepository tastingRequestRepository) {
        this.tastingRequestRepository = tastingRequestRepository;
    }

    public void addNewRequest(TastingRequestDto tastingRequestDto){
        TastingRequest tastingRequest = new TastingRequest();
        tastingRequest.setEmailUser(tastingRequestDto.getEmailUser());
        tastingRequest.setEventType(tastingRequestDto.getEventType());
        tastingRequest.setGuestNumber(tastingRequestDto.getGuestNumber());
        tastingRequest.setEventDate(tastingRequestDto.getEventDate());
        tastingRequest.setPhoneNumber(tastingRequestDto.getPhoneNumber());
        tastingRequestRepository.save(tastingRequest);
    }

    public List<TastingRequest> getAllTastingsRequests(){
        return tastingRequestRepository.findAll();
    }

    public List<TastingRequest>getAllUserRequests(String userEmail){
        return tastingRequestRepository.findAllByEmailUser(userEmail);
    }

    @Override
    public void sendResponse(TastingResponceDto tastingResponceDto) {
        TastingRequest tastingRequest = tastingRequestRepository.getReferenceById(tastingResponceDto.tastingRequestId);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromMsg);
        message.setTo(tastingResponceDto.email);
        message.setSubject("Îți mulțumim pentru interesul acordat cofetariei noastre");
        if(tastingResponceDto.getResponse().equals("yes")){
            message.setText("Solicitarea ta pentru degustare a " +
                    "fost acceptata! Te asteptam in " + tastingResponceDto.getMessage() +" pentru degustre ,multumim!");
        }
        else{
            message.setText("Solicitarea ta pentru degustare a " +
                    "fost respinsa! Din pacate nu putem sa onoram o astfel de comanda. " + tastingResponceDto.getMessage() + " Pentru mai multe detalii ne puteti contacta telefonic sau la locatia noastra. Multumim!");
        }
        mailSender.send(message);
        tastingRequestRepository.delete(tastingRequest);
    }

}

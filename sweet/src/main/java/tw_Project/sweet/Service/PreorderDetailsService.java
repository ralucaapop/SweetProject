package tw_Project.sweet.Service;

import org.springframework.stereotype.Service;

@Service
public interface PreorderDetailsService {
    public void addPreorderDetailsService(Long preorderId, Long preorderItemId );
}

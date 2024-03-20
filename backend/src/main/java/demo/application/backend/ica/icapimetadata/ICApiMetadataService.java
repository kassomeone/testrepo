package demo.application.backend.ica.icapimetadata;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

@Service
public class ICApiMetadataService {

    @Autowired
    private ICApiMetadataRepository icApiMetadataRepository;

    public List<ICApiMetadata> getAllICApiMetadata() {
        return icApiMetadataRepository.findAllByOrderByIcCode();

    }

    public ICApiMetadata getICApiMetadataById(String id) {

        return icApiMetadataRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("ICApiMetadata with id " + id + " not found"));
    }

    public ICApiMetadata createICApiMetadata(ICApiMetadata icApiMetadata) {
        try {
            return icApiMetadataRepository.save(icApiMetadata);
        } catch (DuplicateKeyException e) {

            throw new RuntimeException("icCode,requestType,subRequestType combination must be unique");

        }
    }

    public void deleteICApiMetadata(String id) {
        ICApiMetadata icApiMetadata = getICApiMetadataById(id);
        icApiMetadataRepository.delete(icApiMetadata);
    }

    public void updateStatus(List<String> ids, Boolean status) {

        List<ICApiMetadata> mds = icApiMetadataRepository.findAllById(ids);
        mds.forEach(md -> md.setIsEnabled(status));
        icApiMetadataRepository.saveAll(mds);
        
    }
}
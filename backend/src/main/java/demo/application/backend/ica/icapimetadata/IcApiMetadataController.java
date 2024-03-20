package demo.application.backend.ica.icapimetadata;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/ic-api-metadata")
public class IcApiMetadataController {

    @Autowired
    private ICApiMetadataService icApiMetadataService;

    @GetMapping
    public List<ICApiMetadata> getAllICApiMetadata() {
        return icApiMetadataService.getAllICApiMetadata();
    }

    @GetMapping("/{id}")
    public ICApiMetadata getICApiMetadataById(@PathVariable String id) {
        return icApiMetadataService.getICApiMetadataById(id);
    }

    @PostMapping
    public ICApiMetadata createICApiMetadata(@RequestBody ICApiMetadata icApiMetadata) {
        return icApiMetadataService.createICApiMetadata(icApiMetadata);
    }

    @PostMapping("/toggle-status/{status}")
    public void createICApiMetadata(@RequestBody List<String> ids, @PathVariable Boolean status) {
        icApiMetadataService.updateStatus(ids, status);
    }

    @DeleteMapping("/{id}")
    public void deleteICApiMetadata(@PathVariable String id) {
        icApiMetadataService.deleteICApiMetadata(id);
    }

}

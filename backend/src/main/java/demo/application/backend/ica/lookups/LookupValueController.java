package demo.application.backend.ica.lookups;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/lookup-values")
public class LookupValueController {

    private final LookupValuesService service;

    @Autowired
    public LookupValueController(LookupValuesService service) {
        this.service = service;
    }

    @GetMapping
    public Page<LookupEntity> getAllValues(LookupSearchCriteria critera, @RequestParam Integer page,
            @RequestParam Integer size) {

        return service.findAll(critera, page, size);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LookupEntity> getValueById(@PathVariable("id") String id) {
        Optional<LookupEntity> value = service.findById(id);
        return value.map(v -> new ResponseEntity<>(v, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<LookupEntity> createValue(@RequestBody LookupEntity value) {
        LookupEntity createdValue = service.save(value);
        return new ResponseEntity<>(createdValue, HttpStatus.CREATED);
    }

    @PostMapping("/save-all")
    public ResponseEntity<List<LookupEntity>> createValue(@RequestBody List<LookupEntity> values) {
        List<LookupEntity> createdValue = service.saveAll(values);
        return new ResponseEntity<>(createdValue, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteValue(@PathVariable("id") String id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

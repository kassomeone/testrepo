package demo.application.backend.ica.lookups;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class LookupValuesService {

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    private LookupValuesRepository repository;

    public LookupEntity save(LookupEntity values) {
        return repository.save(values);
    }

    public List<LookupEntity> saveAll(List<LookupEntity> values) {
        return repository.saveAll(values);
    }

    public List<LookupEntity> findAll() {
        return repository.findAll();
    }

    public List<LookupEntity> findByCompanyIdAndField(String companyId, String field) {
        return repository.findByCompanyIdAndField(companyId, field);
    }

    public List<LookupEntity> findByCompanyId(String companyId) {
        return repository.findByCompanyId(companyId);
    }

    public Optional<LookupEntity> findById(String id) {
        return repository.findById(id);
    }

    public void deleteById(String id) {
        repository.deleteById(id);
    }

    public Page<LookupEntity> findAll(LookupSearchCriteria criteria, Integer page, Integer size) {

        List<Criteria> criterias = new ArrayList<>();

        if (criteria.getCompanyId() != null) {
            criterias.add(Criteria.where("companyId").is(criteria.getCompanyId()));
        }
        if (criteria.getField() != null) {
            criterias.add(Criteria.where("field").regex("(?i)" + criteria.getField()));
        }
        if (criteria.getSourceId() != null) {
            criterias.add(Criteria.where("sourceId").is(criteria.getSourceId()));
        }
        if (criteria.getStandardId() != null) {
            criterias.add(Criteria.where("standardId").is(criteria.getStandardId()));
        }

        Query q = new Query().with(Sort.by("updatedAt").descending());

        if (page != null && size != null) {
            q = q.skip((page - 1) * size).limit(size);
        }

        if (!criterias.isEmpty()) {
            Criteria c = new Criteria().andOperator(criterias);
            q.addCriteria(c);
        }

        long totalCount = mongoTemplate.count(new Query(), LookupEntity.class);

        List<LookupEntity> l = mongoTemplate.find(q, LookupEntity.class);
        Page<LookupEntity> pages = new PageImpl<>(l, PageRequest.of(page, size),
                totalCount);

        return pages;

    }
}

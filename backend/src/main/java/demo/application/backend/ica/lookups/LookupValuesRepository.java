package demo.application.backend.ica.lookups;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface LookupValuesRepository extends MongoRepository<LookupEntity, String> {

	public List<LookupEntity> findByCompanyIdAndField(String companyId, String field);

	public List<LookupEntity> findByCompanyId(String companyId);

	public Optional<LookupEntity> findByCompanyIdAndFieldAndSourceId(String companyId, String field, String sourceId);

	public Optional<LookupEntity> findByCompanyIdAndFieldAndStandardId(String companyId, String field,
			String standardId);
}

package demo.application.backend.ica.icapimetadata;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ICApiMetadataRepository extends MongoRepository<ICApiMetadata, String> {

    List<ICApiMetadata> findAllByOrderByCreatedAtDesc();

    List<ICApiMetadata> findAllByOrderByIcCode();
}

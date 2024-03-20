package demo.application.backend.ica.icapimetadata;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@Component
public class ICApiMetadataListener extends AbstractMongoEventListener<ICApiMetadata> {

    @Override
    public void onBeforeConvert(BeforeConvertEvent<ICApiMetadata> event) {
        ICApiMetadata entity = event.getSource();

        // set created timestamp if it's a new document
        if (entity.getId() == null) {
            entity.setCreatedAt(LocalDateTime.now());
        }

        // set updated timestamp on every save
        entity.setUpdatedAt(LocalDateTime.now());
    }
}
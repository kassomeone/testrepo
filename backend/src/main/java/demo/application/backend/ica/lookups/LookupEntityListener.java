package demo.application.backend.ica.lookups;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@Component
public class LookupEntityListener extends AbstractMongoEventListener<LookupEntity> {

    @Override
    public void onBeforeConvert(BeforeConvertEvent<LookupEntity> event) {
        LookupEntity entity = event.getSource();

        // set created timestamp if it's a new document
        if (entity.getLookupId() == null) {
            entity.setCreatedAt(LocalDateTime.now());
        }

        // set updated timestamp on every save
        entity.setUpdatedAt(LocalDateTime.now());
    }
}
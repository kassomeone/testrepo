package demo.application.backend.ica.icapimetadata;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document("iCApiMetadata")
@Getter
@Setter
@NoArgsConstructor
@CompoundIndex(name = "unique-icmetadata", def = "{'icCode':1,'requestType':1,'subRequestType':1}", unique = true)
public class ICApiMetadata {

    @Id
    private String id;
    private String icCode;
    private String requestType;
    private String subRequestType;
    private String insuranceCompanyCode = "1";
    private String insuranceCompanyName = "Offer Broker";

    private Boolean isEnabled = true;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}

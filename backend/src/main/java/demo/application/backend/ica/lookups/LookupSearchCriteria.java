package demo.application.backend.ica.lookups;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LookupSearchCriteria {

    private String companyId;
    private String field;
    private String sourceId;
    private String standardId;

}

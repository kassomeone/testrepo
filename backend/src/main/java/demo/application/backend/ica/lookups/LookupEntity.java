package demo.application.backend.ica.lookups;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document("lookupEntity")
@Getter
@Setter
@NoArgsConstructor
@CompoundIndex(name = "unique-lookup", def = "{'companyId':1,'field':1,'standardId':1,'sourceId':1}", unique = true)
public class LookupEntity {

	@Id
	private String lookupId;
	private String companyId;
	private String field;
	private String nameEn;
	private String nameAr;
	private String descEn;
	private String descAr;
	private String sourceId;
	private String standardId;

	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	// public LookupEntity(String companyId, String field, String descEn, String
	// descAr, String sourceId,
	// String standardId) {
	// super();
	// this.companyId = companyId;
	// this.field = field;
	// this.descEn = descEn;
	// this.descAr = descAr;
	// this.sourceId = sourceId;
	// this.standardId = standardId;
	// }

	// public LookupEntity(String companyId, String field, String descEn, String
	// descAr, String standardId) {
	// super();
	// this.companyId = companyId;
	// this.field = field;
	// this.descEn = descEn;
	// this.descAr = descAr;
	// this.standardId = standardId;
	// }

}

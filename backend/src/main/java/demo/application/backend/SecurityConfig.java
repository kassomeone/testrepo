package demo.application.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}")
    String jwkSetUri;

    @Autowired
    private JwtAuthConverter jwtAuthConverter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((authz) -> authz.requestMatchers(HttpMethod.GET, "/api/**").hasRole("APP_ADMIN")
                .requestMatchers(HttpMethod.GET, "/**").permitAll()

                .anyRequest().authenticated());
        http.sessionManagement(sess -> sess.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS));
        http.oauth2ResourceServer(server -> server.jwt().jwtAuthenticationConverter(jwtAuthConverter));

        // .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
        // .addFilterAfter(createPolicyEnforcerFilter(),
        // BearerTokenAuthenticationFilter.class);
        return http.build();
    }

    // private ServletPolicyEnforcerFilter createPolicyEnforcerFilter() {
    // PolicyEnforcerConfig config;

    // try {
    // config =
    // JsonSerialization.readValue(getClass().getResourceAsStream("/policy-enforcer.json"),
    // PolicyEnforcerConfig.class);
    // } catch (IOException e) {
    // throw new RuntimeException(e);
    // }
    // return new ServletPolicyEnforcerFilter(new ConfigurationResolver() {
    // @Override
    // public PolicyEnforcerConfig resolve(HttpRequest request) {
    // return config;
    // }
    // });
    // }

    @Bean
    JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withJwkSetUri(this.jwkSetUri).build();
    }

}
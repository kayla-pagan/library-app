package com.mainave.spring_boot_library.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable());

        http.authorizeHttpRequests(auth ->
                auth.requestMatchers("/api/books/secure/**",
                        "/api/reviews/secure/**",
                        "/api/histories/**",
                        "/api/messages/secure/**",
                        "/api/messages/**",
                        "/api/admin/secure/**").authenticated().anyRequest().permitAll())
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(jwt ->
                                jwt.jwkSetUri("https://dev-18268144.okta.com/oauth2/default/v1/keys")));
        http.cors(cors -> cors.configurationSource(corsConfiguration()));

        http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());

        Okta.configureResourceServer401ResponseBody(http);

        return http.build();
    }

    private CorsConfigurationSource corsConfiguration() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("http://localhost:5173", "http://mainavebooks.us-east-1.elasticbeanstalk.com"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/books/secure/**", config);
        source.registerCorsConfiguration("/api/reviews/secure/**", config);
        source.registerCorsConfiguration("/api/histories/**", config);
        source.registerCorsConfiguration("/api/messages/secure/**", config);
        source.registerCorsConfiguration("/api/messages/**", config);
        source.registerCorsConfiguration("/api/admin/secure/**", config);
        return source;
    }
}

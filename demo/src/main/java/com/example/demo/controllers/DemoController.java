package com.example.demo.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/**").permitAll() // Public access to APIs
                .anyRequest().authenticated() // Secure other requests
            )
            .formLogin(form -> form
                .loginPage("/login").permitAll() // Custom login page
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/login?logout").permitAll() // Redirect after logout
            );

        return http.build();
    }
}
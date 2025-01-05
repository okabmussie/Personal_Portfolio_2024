package com.example.demo.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // Disable CSRF for simplicity (ensure this is fine for your app)
            .authorizeRequests()
                .requestMatchers("/api/projects/**").permitAll() // Allow access to project-related endpoints without authentication
                .requestMatchers("/api/projects/**/documents/**").authenticated() // Secure document endpoints
                .anyRequest().authenticated() // Require authentication for other requests
            .and()
            .formLogin()
                .permitAll() // Allow access to the login page without authentication
            .and()
            .logout()
                .permitAll(); // Allow users to log out without restrictions

        return http.build();
    }
}
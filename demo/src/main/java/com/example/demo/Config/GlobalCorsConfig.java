// package com.example.demo.Config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class CorsConfig implements WebMvcConfigurer {

//     @Override
//     public void addCorsMappings(CorsRegistry registry) {
//         registry.addMapping("/**") // Apply CORS to all endpoints
//                 .allowedOrigins("http://localhost:3003") // Allow requests from this origin (React frontend)
//                 .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
//                 .allowedHeaders("*") // Allow all headers
//                 .allowCredentials(true); // Allow credentials (cookies, headers, etc.)
//     }
// }



 package com.example.demo.Config;

 import org.springframework.context.annotation.Configuration;
 import org.springframework.web.servlet.config.annotation.CorsRegistry;
 import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
 import org.springframework.lang.NonNull;
 
 @Configuration
 public class GlobalCorsConfig implements WebMvcConfigurer {
 
     @Override
     public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/api/**") // Instead of "/**"
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);


     }
 }

 
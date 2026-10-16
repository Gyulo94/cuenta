package com.cuenta.server.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cuenta.server.global.constants.Constants;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SwaggerConfig {

    private static final String COOKIE_AUTH = "cookieAuth";

    private final Constants constants;

    @Bean
    public OpenAPI openAPI() {
        SecurityScheme cookieAuth = new SecurityScheme()
                .type(SecurityScheme.Type.APIKEY)
                .in(SecurityScheme.In.COOKIE)
                .name(constants.getCookieAccessTokenName());

        return new OpenAPI()
                .info(new Info()
                        .title(constants.getAppName() + " API")
                        .version("v1"))
                .components(new Components().addSecuritySchemes(COOKIE_AUTH, cookieAuth))
                .addSecurityItem(new SecurityRequirement().addList(COOKIE_AUTH));
    }
}

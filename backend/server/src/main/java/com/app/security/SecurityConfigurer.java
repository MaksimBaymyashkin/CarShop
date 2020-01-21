package com.app.security;

import com.app.database.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfigurer extends WebSecurityConfigurerAdapter {
    private static final String[] STATIC_RESOURCES = {
            "/",
            "/**.js",
            "/**.json",
            "/**.xml",
            "/**.html",
            "/**.txt",
            "/**.ico",
            "/icons/**",
            "/images/**",
            "/static/**/**"
    };

    @Autowired
    private SecurityUserService securityUserService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .userDetailsService(this.securityUserService)
            .passwordEncoder(User.PASSWORD_ENCODER);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().and().csrf()
                .disable()
            .authorizeRequests()
            .antMatchers(HttpMethod.GET, STATIC_RESOURCES)
                .permitAll()
            .antMatchers("/api/auth/**")
                .permitAll()
            .antMatchers("/api/**")
                .authenticated()
            .anyRequest().permitAll()
            .and().formLogin()
                .loginPage("/")
            .and().httpBasic()
            .and().logout()
                .clearAuthentication(true)
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID");
    }
}

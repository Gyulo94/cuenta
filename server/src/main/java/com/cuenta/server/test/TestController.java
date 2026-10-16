package com.cuenta.server.test;

import java.time.Instant;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Test", description = "연결 확인 API")
@SecurityRequirements
@RestController
@RequestMapping("/test")
public class TestController {

	@Operation(summary = "프론트-백엔드 연결 확인")
	@GetMapping
	public TestResponse test() {
		return new TestResponse("프론트엔드와 백엔드가 정상적으로 연결되었습니다.", Instant.now());
	}

	public record TestResponse(String message, Instant timestamp) {
	}
}

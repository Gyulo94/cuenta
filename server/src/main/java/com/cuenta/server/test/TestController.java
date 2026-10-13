package com.cuenta.server.test;

import java.time.Instant;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

	@GetMapping
	public TestResponse test() {
		return new TestResponse("프론트엔드와 백엔드가 정상적으로 연결되었습니다.", Instant.now());
	}

	public record TestResponse(String message, Instant timestamp) {
	}
}

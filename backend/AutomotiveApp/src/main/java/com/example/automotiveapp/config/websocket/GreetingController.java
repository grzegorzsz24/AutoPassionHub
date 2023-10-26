package com.example.automotiveapp.config.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
@RequiredArgsConstructor
public class GreetingController {

    private final SimpMessagingTemplate template;

    @RequestMapping(path="/greetings", method=POST)
    public void greet(String greeting) {
        String text = "[" + "]:" + greeting;
        this.template.convertAndSend("/topic/greetings", text);
    }

}

package com.sample.demo.controller;

import com.sample.demo.model.CalendarEvent;
import com.sample.demo.service.CalendarEventService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/calendarevents")
@CrossOrigin(origins = "http://localhost:3000")
public class CalendarEventController {

    @Autowired
    private CalendarEventService eventService;

    @GetMapping
    public ResponseEntity<List<CalendarEvent>> getEvents() {
        List<CalendarEvent> events = eventService.getEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addEvent(@Valid @RequestBody CalendarEvent event) {
        try {
            CalendarEvent createdEvent = eventService.addEvent(event);
            return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        try {
            eventService.deleteEvent(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

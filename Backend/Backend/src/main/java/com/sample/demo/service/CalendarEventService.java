package com.sample.demo.service;

import com.sample.demo.model.CalendarEvent;
import com.sample.demo.repository.CalendarEventRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CalendarEventService {

    @Autowired
    private CalendarEventRepository eventRepository;

    public List<CalendarEvent> getEvents() {
        return eventRepository.findAll();
    }

    public CalendarEvent addEvent(CalendarEvent event) {
        // Validate event details
        if (event.getStart().isAfter(event.getEnd())) {
            throw new IllegalArgumentException("Start time must be before end time");
        }

        // Handle all-day events
        if (event.isAllDay()) {
            event.setStart(event.getStart().withHour(0).withMinute(0).withSecond(0));
            event.setEnd(event.getStart().plusDays(1).withHour(0).withMinute(0).withSecond(0));
        }

        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Event not found");
        }
    }
}

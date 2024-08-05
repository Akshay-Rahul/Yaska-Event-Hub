package com.sample.demo.service;

import com.sample.demo.model.Event;
import com.sample.demo.repository.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepo eventRepo;

    public List<Event> getAllEvents() {
        return eventRepo.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepo.findById(id);
    }

    public Event createOrUpdateEvent(Event event) {
        return eventRepo.save(event);
    }

    public void deleteEvent(Long id) {
        eventRepo.deleteById(id);
    }
}

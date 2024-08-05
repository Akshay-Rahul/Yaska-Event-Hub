package com.sample.demo.repository;

import com.sample.demo.model.CalendarEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalendarEventRepository extends JpaRepository<CalendarEvent, Long> {
}

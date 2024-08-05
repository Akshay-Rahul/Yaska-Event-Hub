package com.sample.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sample.demo.model.JoinedEvent;

@Repository
public interface JoinedEventRepository extends JpaRepository<JoinedEvent, Long> {
    // Additional query methods can be added here if needed
}

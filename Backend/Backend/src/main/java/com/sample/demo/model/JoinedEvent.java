package com.sample.demo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "joinedevents")
@Getter
@Setter
public class JoinedEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long eventId;
    private String eventName;
    private String eventDate;
    private String eventLocation;
    private String eventDescription;
    private String eventOrganizer;
    private String eventImage; 
}

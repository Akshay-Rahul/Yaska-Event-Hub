package com.sample.demo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter 
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;
    private String password;
    private String role;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id") // Foreign key in the joined_events table
    private List<JoinedEvent> joinedEvents = new ArrayList<>();

    // Add a method to join an event
    public void addJoinedEvent(JoinedEvent event) {
        this.joinedEvents.add(event);
    }
}

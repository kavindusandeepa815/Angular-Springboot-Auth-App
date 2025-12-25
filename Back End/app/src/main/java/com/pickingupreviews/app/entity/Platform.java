package com.pickingupreviews.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Platform {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Platform name is required")
    @Size(min = 2, max = 50, message = "Platform name must be between 2 and 50 characters")
    private String name;

    @OneToMany(mappedBy = "platform")
    private List<PlatformTaskType> platformTaskType = new ArrayList<>();
}
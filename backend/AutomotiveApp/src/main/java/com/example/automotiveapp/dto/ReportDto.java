package com.example.automotiveapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportDto {
    private Long id;
    private Long reportTypeId;
    private String reportType;
    private Long userId;
}

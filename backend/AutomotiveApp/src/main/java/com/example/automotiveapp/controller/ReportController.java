package com.example.automotiveapp.controller;

import com.example.automotiveapp.dto.ReportDto;
import com.example.automotiveapp.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/reports")
public class ReportController {
    private final ReportService reportService;

    @GetMapping
    public ResponseEntity<List<ReportDto>> getReports(@RequestParam String reportType) {
        return ResponseEntity.ok(reportService.findReports(reportType));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteReport(@RequestParam Long reportId) {
        reportService.deleteReportById(reportId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/read")
    public ResponseEntity<ReportDto> setReportAsRead(@RequestParam Long reportId) {
        return ResponseEntity.ok(reportService.setReportAsRead(reportId));
    }
}

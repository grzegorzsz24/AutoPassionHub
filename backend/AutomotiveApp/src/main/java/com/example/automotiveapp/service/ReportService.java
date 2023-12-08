package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Report;
import com.example.automotiveapp.domain.ReportType;
import com.example.automotiveapp.dto.ReportDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.ReportDtoMapper;
import com.example.automotiveapp.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;

    public List<ReportDto> findReports(String reportType) {
        return reportRepository.findAllByReportType(ReportType.valueOf(reportType))
                .stream()
                .map(ReportDtoMapper::map)
                .toList();
    }

    public void deleteReportById(Long reportId) {
        reportRepository.deleteById(reportId);
    }

    public ReportDto setReportAsRead(Long reportId) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono raportu"));
        report.setRead(true);
        return ReportDtoMapper.map(reportRepository.save(report));
    }
}

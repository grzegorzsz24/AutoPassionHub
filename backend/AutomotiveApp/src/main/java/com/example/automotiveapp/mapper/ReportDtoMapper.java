package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.Report;
import com.example.automotiveapp.domain.ReportType;
import com.example.automotiveapp.dto.ReportDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.service.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReportDtoMapper {
    private final UserRepository userRepository;

    public static ReportDto map(Report report) {
        ReportDto reportDto = new ReportDto();
        BeanUtils.copyProperties(report, reportDto);
        reportDto.setUserId(report.getUser().getId());
        reportDto.setReportType(String.valueOf(report.getReportType()));
        return reportDto;
    }

    public Report map(ReportDto reportDto) {
        Report report = new Report();
        BeanUtils.copyProperties(reportDto, report);
        report.setUser(userRepository.findByEmail(SecurityUtils.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono uyztkownika")));
        report.setReportType(ReportType.valueOf(reportDto.getReportType()));
        return report;
    }
}

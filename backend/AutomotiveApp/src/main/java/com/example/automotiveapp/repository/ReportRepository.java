package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.Report;
import com.example.automotiveapp.domain.ReportType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    Optional<Report> findByReportTypeIdAndReportType(Long reportTypeId, ReportType reportType);

    List<Report> findAllByReportType(ReportType reportType);
}

package io.nology.shiftgeniusapi.timesheet;

import java.util.List;

import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimesheetRepository extends JpaRepository<Timesheet, Long> {

    List<Timesheet> findByDateBetween(LocalDate startDate, LocalDate endDate);
}

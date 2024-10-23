package io.nology.shiftgeniusapi.timesheet;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class CreateTimesheetDTO {

    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalTime breakTime;
    private String description;
    private Long userId;
    private boolean approved;
}

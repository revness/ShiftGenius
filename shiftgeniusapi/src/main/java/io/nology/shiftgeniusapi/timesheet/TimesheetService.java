package io.nology.shiftgeniusapi.timesheet;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TimesheetService {

    @Autowired
    private TimesheetRepository timesheetRepository;

    public List<Timesheet> getTimesheets() {
        return timesheetRepository.findAll();
    }

    public Timesheet getTimesheet(Long id) {
        return timesheetRepository.findById(id).orElse(null);
    }

    public Timesheet createTimesheet(Timesheet timesheet) {
        return timesheetRepository.save(timesheet);
    }

    public Timesheet updateTimesheet(Long id, Timesheet timesheet) {
        Timesheet existingTimesheet = timesheetRepository.findById(id).orElse(null);
        if (existingTimesheet == null) {
            return null;
        }
        existingTimesheet.setDate(timesheet.getDate());
        existingTimesheet.setStartTime(timesheet.getStartTime());
        existingTimesheet.setEndTime(timesheet.getEndTime());
        existingTimesheet.setDescription(timesheet.getDescription());
        return timesheetRepository.save(existingTimesheet);
    }

    public void deleteTimesheet(Long id) {
        timesheetRepository.deleteById(id);
    }

}

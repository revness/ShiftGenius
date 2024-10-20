
package io.nology.shiftgeniusapi.timesheet;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.nology.shiftgeniusapi.auth.User;
import io.nology.shiftgeniusapi.auth.UserRepository;
import jakarta.validation.Valid;

@Service
public class TimesheetService {

    @Autowired
    private TimesheetRepository timesheetRepository;

    @Autowired
    private UserRepository UserRepository;

    public Timesheet createTimesheet(@Valid CreateTimesheetDTO data) throws Exception {
        User user = UserRepository.findById(data.getUserId()).orElseThrow(() -> new Exception("User not found"));

        Timesheet timesheet = new Timesheet();
        timesheet.setDate(data.getDate());
        timesheet.setStartTime(data.getStartTime());
        timesheet.setEndTime(data.getEndTime());
        timesheet.setBreakTime(data.getBreakTime());
        timesheet.setDescription(data.getDescription());
        timesheet.setUser(user);
        return timesheetRepository.save(timesheet);
    }

    public List<Timesheet> getTimesheets() {
        return timesheetRepository.findAll();
    }

    public Timesheet getTimesheet(Long id) {
        return timesheetRepository.findById(id).orElse(null);
    }

    public Timesheet updateTimesheet(Long id, @Valid UpdateTimesheetDTO data) throws Exception {
        Timesheet timesheet = timesheetRepository.findById(id).orElse(null);
        if (timesheet == null) {
            throw new Exception("Timesheet not found");
        }
        timesheet.setDate(data.getDate());
        timesheet.setStartTime(data.getStartTime());
        timesheet.setEndTime(data.getEndTime());
        timesheet.setBreakTime(data.getBreakTime());
        timesheet.setDescription(data.getDescription());
        User user = UserRepository.findById(data.getUserId()).orElseThrow(() -> new Exception("User not found"));
        timesheet.setUser(user);

        return timesheetRepository.save(timesheet);
    }

    public void deleteTimesheet(Long id) {
        timesheetRepository.deleteById(id);
    }

}


package io.nology.shiftgeniusapi.timesheet;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import io.nology.shiftgeniusapi.auth.Role;
import io.nology.shiftgeniusapi.auth.User;
import io.nology.shiftgeniusapi.auth.UserRepository;
import jakarta.validation.Valid;
import java.time.LocalDate;

@Service
public class TimesheetService {

    @Autowired
    private TimesheetRepository timesheetRepository;

    @Autowired
    private UserRepository UserRepository;

    public Timesheet createTimesheet(@Valid CreateTimesheetDTO data) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        User user = UserRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (user.getRole() != Role.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only admins can create timesheets");
        }
        User userID = UserRepository.findById(data.getUserId()).orElseThrow(() -> new Exception("User not found"));

        Timesheet timesheet = new Timesheet();
        timesheet.setDate(data.getDate());
        timesheet.setStartTime(data.getStartTime());
        timesheet.setEndTime(data.getEndTime());
        timesheet.setBreakTime(data.getBreakTime());
        timesheet.setDescription(data.getDescription());
        timesheet.setApproved(false);
        timesheet.setUser(userID);
        return timesheetRepository.save(timesheet);
    }

    public List<Timesheet> getTimesheets(String date) {
        // get the month and year from the date
        String[] dateParts = date.split("-");
        int year = Integer.parseInt(dateParts[0]);
        int month = Integer.parseInt(dateParts[1]);
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);
        return timesheetRepository.findByDateBetween(startDate, endDate);

        // System.out.println(date + " is the date");
        // LocalDate parsedDate = LocalDate.parse(date);
        // System.out.println(parsedDate + " is the parsed date");
        // return timesheetRepository.findByDate(parsedDate);
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

    public void deleteTimesheet(Long id) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        User user = UserRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (user.getRole() != Role.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only admins can delete timesheets");
        }
        timesheetRepository.deleteById(id);
    }

    public Timesheet approveTimesheet(Long id) throws Exception {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        User user = UserRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (user.getRole() != Role.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only admins can approve timesheets");
        }
        Timesheet timesheet = timesheetRepository.findById(id).orElse(null);
        if (timesheet == null) {
            throw new Exception("Timesheet not found");
        }
        timesheet.setApproved(!timesheet.isApproved());
        return timesheetRepository.save(timesheet);
    }

}

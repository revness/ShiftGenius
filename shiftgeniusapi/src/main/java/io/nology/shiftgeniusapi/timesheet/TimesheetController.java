package io.nology.shiftgeniusapi.timesheet;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/timesheet")
public class TimesheetController {

    @Autowired
    private TimesheetService timesheetService;

    @PostMapping
    public ResponseEntity<Timesheet> createTimesheet(@RequestBody CreateTimesheetDTO timesheet) throws Exception {
        Timesheet newTimesheet = timesheetService.createTimesheet(timesheet);
        return new ResponseEntity<Timesheet>(newTimesheet, HttpStatus.CREATED);
    }

    @GetMapping("/{date}")
    public ResponseEntity<List<Timesheet>> getTimesheets(@PathVariable String date) {
        List<Timesheet> timesheets = timesheetService.getTimesheets(date);
        return new ResponseEntity<List<Timesheet>>(timesheets, HttpStatus.OK);
    }

    // @GetMapping("/{id}")
    // public ResponseEntity<Timesheet> getTimesheet(@PathVariable Long id) {
    // Timesheet timesheet = timesheetService.getTimesheet(id);
    // return new ResponseEntity<Timesheet>(timesheet, HttpStatus.OK);
    // }

    @PatchMapping("/{id}")
    public ResponseEntity<Timesheet> updateTimesheet(@PathVariable Long id, @RequestBody UpdateTimesheetDTO timesheet)
            throws Exception {
        Timesheet updatedTimesheet = timesheetService.updateTimesheet(id, timesheet);
        return new ResponseEntity<Timesheet>(updatedTimesheet, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTimesheet(@PathVariable Long id) {
        timesheetService.deleteTimesheet(id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

}

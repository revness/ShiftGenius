import { CaretLeft, CaretRight, Clock, DotsThree } from "@phosphor-icons/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import { getTimeSheets } from "../../services/shift";
import Shifts from "../Shifts/Shifts";
import UserInfo from "../UserInfo/UserInfoInDashBoard";
import { AuthContext } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
// Types for shift data
interface Shift {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  breakTime: string;
  description: string;
  user: User;
}

interface User {
  id: number;
  userName: string;
  email: string;
  position: string | null;
  department: string | null;
  phone: string | null;
}

// Type for individual calendar day
interface CalendarDay {
  date: string;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  shifts: Shift[];
}

const getMonthName = (monthNumber: number) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNumber];
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [showShifts, setShowShifts] = useState<boolean>(false);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const selectedDay = calendarDays.find((day: CalendarDay) => day.isSelected);
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used within a UserProvider");
  }
  const { isAuthenticated } = authContext;

  const handleShowShifts = () => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
    setShowShifts(!showShifts);
  };

  // Format time to 12-hour format
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Format shift time range
  const formatShiftTime = (startTime: string, endTime: string) => {
    const start = formatTime(startTime.slice(0, 5));
    const end = formatTime(endTime.slice(0, 5));
    return `${start}-${end}`;
  };

  // Fetch shifts and update calendar
  useEffect(() => {
    const fetchAndUpdateShifts = async () => {
      try {
        const data = await getTimeSheets(formatDate(currentDate));
        setShifts(data);
        updateCalendarWithShifts(data);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };

    fetchAndUpdateShifts();
  }, [currentDate]);
  // Update calendar days with shifts
  const updateCalendarWithShifts = (shiftsData: Shift[]) => {
    const days = getCalendarDays(currentDate);

    // Map shifts to corresponding days
    const updatedDays = days.map((day) => ({
      ...day,
      shifts: shiftsData.filter((shift) => shift.date === day.date),
      isSelected: day.date === selectedDate,
    }));

    setCalendarDays(updatedDays);
  };
  const getCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days: CalendarDay[] = [];
    const today = formatDate(new Date());

    // Previous month's days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const prevMonthDate = new Date(year, month, 0 - i);
      const dateString = formatDate(prevMonthDate);
      days.push({
        date: dateString,
        isCurrentMonth: false,
        isSelected: false,
        isToday: dateString === today,
        shifts: [],
      });
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const dateString = formatDate(currentDate);
      days.push({
        date: dateString,
        isCurrentMonth: true,
        isSelected: false,
        isToday: dateString === today,
        shifts: [],
      });
    }

    const remainingDays = 42 - days.length;

    // Next month's days
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDate = new Date(year, month + 1, i);
      const dateString = formatDate(nextMonthDate);
      days.push({
        date: dateString,
        isCurrentMonth: false,
        isSelected: false,
        isToday: dateString === today,
        shifts: [],
      });
    }

    return days;
  };

  // Update calendar days when current date or selected date changes
  useEffect(() => {
    const days = getCalendarDays(currentDate);
    const updatedDays = days.map((day) => ({
      ...day,
      shifts: shifts.filter((shift) => shift.date === day.date),
      isSelected: day.date === selectedDate,
    }));
    setCalendarDays(updatedDays);
  }, [currentDate]); // Only depend on currentDate, not selectedDate

  // Handle day selection
  const handleDaySelect = (date: string) => {
    const newSelectedDate = date === selectedDate ? null : date;
    setSelectedDate(newSelectedDate);

    setCalendarDays((prevDays) =>
      prevDays.map((day) => ({
        ...day,
        isSelected: day.date === newSelectedDate,
      }))
    );
  };

  return (
    <div className="">
      <div className="lg:flex lg:h-full lg:flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            <time>
              {getMonthName(currentDate.getMonth()) +
                " " +
                currentDate.getFullYear()}
            </time>
          </h1>
          <UserInfo />
          <div className="flex items-center">
            <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch md:ml-4">
              <button
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
                onClick={() =>
                  setCurrentDate(
                    new Date(currentDate.setMonth(currentDate.getMonth() - 1))
                  )
                }
              >
                <CaretLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </button>
              <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
              <button
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
                onClick={() =>
                  setCurrentDate(
                    new Date(currentDate.setMonth(currentDate.getMonth() + 1))
                  )
                }
              >
                <CaretRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden md:flex md:items-center">
              <div className="ml-6 h-6 w-px bg-gray-300" />
              <button
                type="button"
                className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleShowShifts}
              >
                Add shift
              </button>
            </div>
            <Menu as="div" className="relative ml-6 md:hidden">
              <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open menu</span>
                <DotsThree className="h-5 w-5" aria-hidden="true" />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      onClick={() => setShowShifts(!showShifts)}
                    >
                      Create shift
                    </a>
                  </MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Go to today
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
        </header>
        <div>{showShifts && <Shifts />}</div>
        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
          <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
            <div className="bg-white py-2">
              M<span className="sr-only sm:not-sr-only">on</span>
            </div>
            <div className="bg-white py-2">
              T<span className="sr-only sm:not-sr-only">ue</span>
            </div>
            <div className="bg-white py-2">
              W<span className="sr-only sm:not-sr-only">ed</span>
            </div>
            <div className="bg-white py-2">
              T<span className="sr-only sm:not-sr-only">hu</span>
            </div>
            <div className="bg-white py-2">
              F<span className="sr-only sm:not-sr-only">ri</span>
            </div>
            <div className="bg-white py-2">
              S<span className="sr-only sm:not-sr-only">at</span>
            </div>
            <div className="bg-white py-2">
              S<span className="sr-only sm:not-sr-only">un</span>
            </div>
          </div>
          <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
            <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
              {calendarDays.map((day) => (
                <div
                  key={day.date}
                  className={classNames(
                    day.isCurrentMonth
                      ? "bg-white"
                      : "bg-gray-50 text-gray-500",
                    "relative px-3 py-2 "
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={
                      day.isToday
                        ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                        : undefined
                    }
                  >
                    {day.date.split("-").pop()?.replace(/^0/, "")}
                  </time>
                  {day.shifts.length > 0 && (
                    <ol className="mt-2 h-24 w-24 overflow-auto">
                      {day.shifts.slice(0, 2).map((shift) => (
                        <li key={shift.id} className="group flex">
                          <a href="#" className="flex flex-col">
                            <p className=" font-medium text-xs text-gray-900 group-hover:text-indigo-600">
                              {shift.user.userName}
                            </p>
                            <time className="text-xs text-gray-500 group-hover:text-indigo-600">
                              {formatShiftTime(shift.startTime, shift.endTime)}
                            </time>
                          </a>
                        </li>
                      ))}
                      {day.shifts.length > 2 && (
                        <li className="text-gray-500">
                          + {day.shifts.length - 2} more
                        </li>
                      )}
                    </ol>
                  )}
                  {day.shifts.length === 0 && (
                    <ol className="text-gray-500 h-24 w-24 ">
                      <span>No shifts</span>
                    </ol>
                  )}
                </div>
              ))}
            </div>
            <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
              {calendarDays.map((day) => (
                <button
                  key={day.date}
                  type="button"
                  className={classNames(
                    day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                    (day.isSelected || day.isToday) && "font-semibold",
                    day.isSelected && "text-white",
                    !day.isSelected && day.isToday && "text-indigo-600",
                    !day.isSelected &&
                      day.isCurrentMonth &&
                      !day.isToday &&
                      "text-gray-900",
                    !day.isSelected &&
                      !day.isCurrentMonth &&
                      !day.isToday &&
                      "text-gray-500",
                    "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10"
                  )}
                  onClick={() => handleDaySelect(day.date)}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      day.isSelected &&
                        "flex h-6 w-6 items-center justify-center rounded-full",
                      day.isSelected && day.isToday && "bg-indigo-600",
                      day.isSelected && !day.isToday && "bg-gray-900",
                      "ml-auto"
                    )}
                  >
                    {day.date.split("-").pop()?.replace(/^0/, "")}
                  </time>
                  <span className="sr-only">{day.shifts.length} shifts</span>
                  {day.shifts.length > 0 && (
                    <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                      {day.shifts.map((event: Shift) => (
                        <span
                          key={event.id}
                          className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                        />
                      ))}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        {selectedDay && (
          <div className="px-4 py-10 sm:px-6 lg:hidden">
            <div className="rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-base font-semibold">
                  Shifts for {new Date(selectedDay.date).toLocaleDateString()}
                </h2>
              </div>
              {selectedDay.shifts.length > 0 ? (
                <ol className="divide-y divide-gray-100">
                  {selectedDay.shifts.map((shift) => (
                    <li key={shift.id} className="flex px-4 py-4">
                      <div className="flex-shrink-0">
                        <Clock className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="font-medium text-gray-900">
                          {shift.user.userName}
                        </p>
                        <time className="text-gray-500">
                          {formatShiftTime(shift.startTime, shift.endTime)}
                        </time>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="p-4 text-gray-500 text-center">
                  No shifts scheduled
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;

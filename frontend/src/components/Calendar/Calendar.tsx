import { CaretLeft, CaretRight, Clock, DotsThree } from "@phosphor-icons/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import { getTimeSheets } from "../../services/shift";

// const days = [
//   { date: "2021-12-27", shifts: [] },
//   { date: "2021-12-28", shifts: [] },
//   { date: "2021-12-29", shifts: [] },
//   { date: "2021-12-30", shifts: [] },
//   { date: "2021-12-31", shifts: [] },
//   { date: "2022-01-01", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-02", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-03", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-04", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-05", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-06", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-07", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-08", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-09", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-10", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-11", isCurrentMonth: true, shifts: [] },
//   {
//     date: "2022-01-12",
//     isCurrentMonth: true,
//     isToday: true,
//     isSelected: true,

//     shifts: [
//       {
//         id: 6,
//         name: "John Smith",
//         time: "2PM-8PM",
//         datetime: "2022-01-25T14:00",
//         href: "#",
//       },
//     ],
//   },
//   { date: "2022-01-13", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-14", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-15", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-16", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-17", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-18", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-19", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-20", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-21", isCurrentMonth: true, shifts: [] },
//   {
//     date: "2022-01-22",
//     isCurrentMonth: true,
//     shifts: [
//       {
//         id: 5,
//         name: "Jane Doe",
//         time: "9AM-5PM",
//         datetime: "2022-01-22T21:00",
//         href: "#",
//       },
//     ],
//   },
//   { date: "2022-01-23", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-24", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-25", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-26", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-27", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-28", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-29", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-30", isCurrentMonth: true, shifts: [] },
//   { date: "2022-01-31", isCurrentMonth: true, shifts: [] },
//   { date: "2022-02-01", shifts: [] },
//   { date: "2022-02-02", shifts: [] },
//   { date: "2022-02-03", shifts: [] },
//   {
//     date: "2022-02-04",
//     shifts: [
//       {
//         id: 7,
//         name: "Sarah Johnson",
//         time: "9AM-5PM",
//         datetime: "2022-02-04T21:00",
//         href: "#",
//       },
//     ],
//   },
//   { date: "2022-02-05", shifts: [] },
//   { date: "2022-02-06", shifts: [] },
// ];

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    (async () => {
      const data = await getTimeSheets(formatDate(currentDate));
      console.log(data);
    })();
  }, []);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = getDaysInMonth(year, month);

    // Get the day of week for the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    // Adjust to make Monday the first day of the week
    firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    let calendarDays = [];

    // Previous month's days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const prevMonthDate = new Date(year, month, 0 - i);
      calendarDays.push({
        date: formatDate(prevMonthDate),
        isCurrentMonth: false,
        isSelected: false,
        isToday: false,
        shifts: [],
      });
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      calendarDays.push({
        date: formatDate(currentDate),
        isCurrentMonth: true,
        isSelected: false,
        isToday: false,
        shifts: [],
      });
    }

    // Next month's days
    const daysToAdd = 42 - calendarDays.length;
    for (let i = 1; i < 7 - daysToAdd; i++) {
      const nextMonthDate = new Date(year, month + 1, i);
      calendarDays.push({
        date: formatDate(nextMonthDate),
        isCurrentMonth: false,
        isSelected: false,
        isToday: false,
        shifts: [],
      });
    }

    return calendarDays;
  };

  const calendarDays = getCalendarDays(currentDate);
  const selectedDay = calendarDays.find((day) => day.isSelected);

  console.log(calendarDays);
  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          <time dateTime="2022-01">January 2022</time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch md:ml-4">
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous month</span>
              <CaretLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next month</span>
              <CaretRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:flex md:items-center">
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <button
              type="button"
              className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
                  "relative px-3 py-2"
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
                  <ol className="mt-2">
                    {day.shifts.slice(0, 2).map((event) => (
                      <li key={event.id}>
                        <a href={event.href} className="group flex">
                          <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                            {event.name}
                          </p>
                          <time
                            dateTime={event.datetime}
                            className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                          >
                            {event.time}
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
                    {day.shifts.map((event) => (
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
      {selectedDay && selectedDay.shifts.length > 0 && (
        <div className="px-4 py-10 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
            {selectedDay.shifts.map((event) => (
              <li
                key={event.id}
                className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
              >
                <div className="flex-auto">
                  <p className="font-semibold text-gray-900">{event.name}</p>
                  <time
                    dateTime={event.datetime}
                    className="mt-2 flex items-center text-gray-700"
                  >
                    <Clock
                      className="mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {event.time}
                  </time>
                </div>
                <a
                  href={event.href}
                  className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                >
                  Edit<span className="sr-only">, {event.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Calendar;

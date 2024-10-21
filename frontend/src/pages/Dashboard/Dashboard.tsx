import { useEffect } from "react";
import Calendar from "../../components/Calendar/Calendar";
import { getTimeSheet } from "../../services/shift";

const Dashboard = () => {
  useEffect(() => {
    console.log(
      "get timesheet",
      getTimeSheet("2007-12-03").then((res) => console.log(res))
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <Calendar />
    </div>
  );
};
export default Dashboard;

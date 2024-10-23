import Calendar from "../../components/Calendar/Calendar";
import UserInfo from "../../components/UserInfo/UserInfoInDashBoard";

const Dashboard = () => {
  return (
    <div className="flex flex-col ">
      {/* not sure about the styling here , wants to move to left side of screen? */}
      {/* <div className="flex justify-start items-start ">
        <UserInfo />
      </div> */}
      <div className="items-center justify-center">
        <Calendar />
      </div>
    </div>
  );
};

export default Dashboard;

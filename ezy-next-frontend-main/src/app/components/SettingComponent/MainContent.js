import SettingsTabs from "./SettingTabs";
import ReportForm from "./ReportForm"
import CMODashboard from "./CMODashboard";
function MainContent() {
    return (
      <main className="flex flex-col ml-5 w-[77%] max-md:ml-0 max-md:w-full">
        <div className=" mt-8 w-[1200px] h-[1470px] text-xl text-neutral-400 max-md:mt-10 max-md:max-w-full">
          <SettingsTabs />
          <ReportForm/>
        </div>
      </main>
    );
  }
  export default MainContent;
import SettingsTabs from "./SettingTabs";
import ReportForm from "./ReportForm"
function MainContent() {
    return (
      <main className="flex flex-col ml-5 w-[77%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col mt-8 w-full text-xl text-neutral-400 max-md:mt-10 max-md:max-w-full">
          <SettingsTabs />
          <ReportForm />
        </div>
      </main>
    );
  }
  
  export default MainContent;
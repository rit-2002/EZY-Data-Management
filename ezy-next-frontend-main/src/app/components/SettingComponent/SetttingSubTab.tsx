import SettingsTabs from "./SettingTabs";
import Smalltabs from "./SmallSeetingTab";
import SettingTab from "./SettingTab";
import CustomDashboard from "./CustomDashboard";
function SettingSubTab() {
    return (
      <main className="flex flex-col ml-5 w-[77%] max-md:ml-0 max-md:w-full ">
        <div className=" mt-8 w-[1200px] h-[1470px] text-xl text-neutral-400 max-md:mt-10 max-md:max-w-full ">
          <SettingsTabs />
          <div className=" mt-4 ml-4 w-[1000px]  rounded-3xl border border-solid bg-stone-300 border-stone-300 shadow-[0px_4px_4px_rgba(0,0,0,0.25) h-[1070px] text-xl text-neutral-400 max-md:mt-10 max-md:max-w-full bg-white  ">
          <CustomDashboard title={"Custome Dashboard"}/>
          <Smalltabs/>  
          <SettingTab/>
          </div>
        </div>
      </main>
    );
  }
  export default SettingSubTab;
  
import AccountDetails from "./AccountDetails";
import ChangePassword from "./ChangePassword";


const AccountSection = ({ isDarkMode }) => (
    <div className="w-7/12 min-w-60 mx-auto p-1">
        {/* <AccountDetails isDarkMode={isDarkMode}/> */}
        <ChangePassword isDarkMode={isDarkMode}/>
    </div>
);

export default AccountSection
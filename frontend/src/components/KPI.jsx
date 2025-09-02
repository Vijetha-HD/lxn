import TrendingUpIcon from "../icons/TrendingUpIcon";
import Card from "./Card";

// Roles allowed to use dark mode
const rolesWithDarkMode = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const KPI = ({ title, value, trend, unit = '', darkMode, userRole }) => {
  const isPositive = trend >= 0;
  
  // Determine if dark background should be applied
  const enableDark = rolesWithDarkMode.includes(userRole) && darkMode;
  
  return (
    <Card
      className="p-4 flex flex-col justify-between min-h-[140px] sm:min-h-[160px]"
      darkMode={enableDark}  // pass this to Card
      userRole={userRole}
    >
      <p className={`text-sm ${enableDark ? "text-gray-300" : "text-gray-500"}`}>
        {title}
      </p>
      <p className={`text-3xl font-bold my-1 ${enableDark ? "text-white" : "text-gray-900"}`}>
        {value}{unit}
      </p>
      <div className={`flex items-center text-sm ${isPositive ? "text-green-400" : "text-pink-500"}`}>
        <TrendingUpIcon className={`w-4 h-4 mr-1 ${!isPositive && "transform rotate-180"}`} />
        <span>{trend}% vs last week</span>
      </div>
    </Card>
  );
};

export default KPI;

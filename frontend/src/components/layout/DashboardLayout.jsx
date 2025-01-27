import { useContext } from "react";
import UserDetailsCard from "../cards/UserDetailsCard";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/UserContext";

// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>

          <div className="hidden md:block mr-5">
            <UserDetailsCard
              profileImageUrl={user && user.profileImageUrl}
              fullName={user && user.fullName}
              username={user && user.username}
              totalCastVotes={user && user.totalCastVotes}
              totalVotesCreated={user && user.totalVotesCreated}
              totalVotesBookmarked={user && user.totalVotesBookmarked}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;

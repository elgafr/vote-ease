import Navbar from "./Navbar"
import SideMenu from "./SideMenu"

// eslint-disable-next-line react/prop-types
const DashboardLayout = ({children, activeMenu}) => {
  return (
    <div>
      <Navbar />
      <div className="max-[1080px]:hidden">
        <SideMenu activeMenu={activeMenu} />
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout

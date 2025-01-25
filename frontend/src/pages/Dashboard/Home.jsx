import DashboardLayout from "../../components/layout/DashboardLayout"
import useUserAuth from "../../hooks/useUserAuth"

const Home = () => {
  useUserAuth()

  return (
    <DashboardLayout activeMenu="Dashboard">
      <h1>home</h1>
    </DashboardLayout>
  )
}

export default Home

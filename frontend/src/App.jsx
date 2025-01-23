import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router";
import LoginForm from "./pages/Auth/LoginForm";
import SignUpForm from "./pages/Auth/SignUpForm";
import Home from "./pages/Dashboard/Home";
import CreateVote from "./pages/Dashboard/CreateVote";
import MyVotes from "./pages/Dashboard/MyVotes";
import Voted from "./pages/Dashboard/Voted";
import Bookmarks from "./pages/Dashboard/Bookmarks";


function App() {
  return (
    <div>
     <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup"  element={<SignUpForm />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/create-vote" element={<CreateVote />} />
        <Route path="/my-votes" element={<MyVotes />} />
        <Route path="/voted" element={<Voted />} />
        <Route path="/bookmarked-votes" element={<Bookmarks />} />


      </Routes>
     </Router>
    </div>
  );
}

export default App;


const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )

}
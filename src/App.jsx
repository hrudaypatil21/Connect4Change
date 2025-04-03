import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import HomePage from "./components/HomePage/homePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/header";
import Projects from "./components/projects/projects";
import NGOS from "./components/Ngos/NGOS";
import IndividualRegistration from "./components/IndividualRegistration/IndividualRegistration";
import VolunteerDashboard from "./components/VolunteerDashboard/VolunteerDashboard";
import NGORegistration from "./components/NGORegistration/NGORegistration";
import NGODashboard from "./components/NGODashboard/NGODashboard";
import CreateProject from "./components/CreateProject/CreateProject";
import SignUp from "./components/signUp/signUp";
import SDGCards from "./components/SDGCards/SDGCards";
// import VolunteerForm from "./VolunteerForm/VolunteerForm";


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/projects' element={<Projects />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/ngos" element={<NGOS />} />
          <Route path="/signup/individual-registration" element={<IndividualRegistration />} />
          <Route path="/signup/ngo-registration" element={<NGORegistration />} />
          <Route path="/individual-registration" element={<IndividualRegistration />} />
          <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
          <Route path="/ngo-registration" element={<NGORegistration />} />
          <Route path="/ngo-dashboard" element={<NGODashboard />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/sdg-cards" element={<SDGCards />} />
          {/* <Route path="/volunteer-form" element={<VolunteerForm />} /> */}
          {/* <Route path="/projects" element={<Projects />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
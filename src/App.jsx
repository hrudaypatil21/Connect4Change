import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import HomePage from "./HomePage/homePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header/header";
import Projects from "./projects/projects";
import IndividualRegistration from "./IndividualRegistration/IndividualRegistration";
import NGORegistration from "./NGORegistration/NGORegistration";


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
          <Route path="/individual-registration" element={<IndividualRegistration />} />
          <Route path="/ngo-registration" element={<NGORegistration />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

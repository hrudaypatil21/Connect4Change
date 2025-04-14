import { useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage/homePage";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from "./components/Header/header";
import Projects from "./components/projects/projects";
import NGOS from "./components/Ngos/NGOS";
import IndividualRegistration from "./components/IndividualRegistration/IndividualRegistration";
import VolunteerDashboard from "./components/VolunteerDashboard/VolunteerDashboard";
import NGORegistration from "./components/NGORegistration/NGORegistration";
import NGODashboard from "./components/NGODashboard/NGODashboard";
import CreateProject from "./components/CreateProject/CreateProject";
import SignIn from "./components/signIn/signIn";
import SDGCards from "./components/SDGCards/SDGCards";
import VolunteersPage from "./components/VolunteersPage/VolunteersPage";
import LoginIndividual from "./components/Login_Individual/Login_Individual";
import LoginNGO from "./components/Login-Ngo/Login-Ngo";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext"; // Add this import
import ProjectsMatch from "./components/projects/projectsMatch"; // Ensure this path is correct

function App() {
  return (

      <Router>
            <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/ngos" element={<NGOS />} />
          <Route
            path="/signup/individual-registration"
            element={<IndividualRegistration />}
          />
          <Route
            path="/signup/ngo-registration"
            element={<NGORegistration />}
          />
          <Route
            path="/individual-registration"
            element={<IndividualRegistration />}
          />
          <Route path="/ngo-registration" element={<NGORegistration />} />

          {/* Protected Routes */}
          <Route
            path="/ngo-dashboard"
            element={
              <ProtectedRoute allowedRoles={["ngo"]}>
                <NGODashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/volunteer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["individual"]}>
                <VolunteerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects-match"
            element={
              <ProtectedRoute allowedRoles={["individual"]}>
                <ProjectsMatch />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-project"
            element={
              <ProtectedRoute allowedRoles={["ngo"]}>
                <CreateProject />
              </ProtectedRoute>
            }
          />

          <Route path="/sdg-cards" element={<SDGCards />} />
          <Route path="/volunteers-page" element={<VolunteersPage />} />
          <Route path="/login-individual" element={<LoginIndividual />} />
          <Route path="/login-ngo" element={<LoginNGO />} />
        </Routes>
        </AuthProvider>
      </Router>

  );
}

// Move the SignUp component to a separate file or remove it if not needed
// It can't be in the same file as another default export

export default App;

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Tests from "./pages/Tests";
import TestInstance from "./pages/TestInstance";
import ResultInstance from "./pages/ResultInstance";

import AuthWrapper from "./wrappers/AuthWrapper";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<AuthWrapper />}>
          <Route path='/home' element={<Home />} />
          <Route path='/tests' element={<Tests />} />
          <Route path='/tests/:testId' element={<TestInstance />} />
          <Route path='/results/:resultId' element={<ResultInstance />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

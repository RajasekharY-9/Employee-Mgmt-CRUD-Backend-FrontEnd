import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import EmployeeDashboard from "./components/EmployeeDashboard";

function App() {
  const [auth, setAuth] = useState(null);

  return (
    <div>
 {!auth ? <LoginForm setAuth={setAuth} /> : <EmployeeDashboard auth={auth} />}    </div>
  );
}

export default App;

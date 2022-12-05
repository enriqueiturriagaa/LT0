import "./App.css";
import { useState } from "react";
import NavBar from "./NavBar";
import MainDashboard from "./MainDashboard";
import OpenLotto from "./OpenLotto";

function App() {
  const [accounts, setAccounts] = useState([]);

  //Return statement
  return (
    <div className="App" class="font-mono">
      <NavBar accounts={accounts} setAccounts={setAccounts} />
      <MainDashboard accounts={accounts} setAccounts={setAccounts} />
      {/* REMOVE THIS AFTER DEV... ALREADY CONDITIONALLY SHOWING HANDLED */}
      {/* <OpenLotto /> */}
    </div>
  );
}

export default App;

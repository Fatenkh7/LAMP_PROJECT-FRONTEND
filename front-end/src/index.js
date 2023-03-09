import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Admins from "./pages/admins/index";
import Categories from "./pages/categories/index";
import Currencies from "./pages/currencies/index";
import FixedKeys from "./pages/fixed-keys/index";
import FixedTransactions from "./pages/fixed-transactions/index";
import RecurringTransactions from "./pages/recurring-transactions/index";
import ProfitGoal from "./pages/profit-goals/index";
import Reports from "./pages/reports/index";
import Dashboard from "./pages/dashboard/index";
import AddCurrency from "./pages/currencies/add-currency";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="admins" element={<Admins />} />
        <Route path="categories" element={<Categories />} />
        <Route path="currencies" element={<Currencies />} />
        <Route path="fixedkeys" element={<FixedKeys />} />
        <Route path="fixedtransactions" element={<FixedTransactions />} />
        <Route
          path="recurringtransactions"
          element={<RecurringTransactions />}
        />
        <Route path="profitgoals" element={<ProfitGoal />} />
        <Route path="reports" element={<Reports />} />
        <Route path="currencies/addcurrency" element={<AddCurrency/>} />

      </Route>
    </Routes>
  </BrowserRouter>
  // document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

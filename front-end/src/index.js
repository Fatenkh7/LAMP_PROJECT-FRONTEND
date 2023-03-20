import React from "react";
import ReactDOM from "react-dom";
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
import { Balance, BalanceYearly } from "./pages/balance/index";

import Login from "./pages/login/index";

ReactDOM.render(
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
        <Route path="balance" element={<Balance />} />
        <Route path="balance-yearly" element={<BalanceYearly />} />
      </Route>
      <Route index path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();

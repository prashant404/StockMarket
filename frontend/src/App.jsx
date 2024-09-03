// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/Portfolio";
import TradePage from "./pages/TradePage";
import AlertPage from "./pages/AlertPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/trade" element={<TradePage />} />
        <Route path="/alerts" element={<AlertPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;

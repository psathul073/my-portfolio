import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import ScrollToTop from './components/Scroll-To-Top.jsx';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <ScrollToTop />
      <App />
    </ThemeProvider>
  </BrowserRouter>
);

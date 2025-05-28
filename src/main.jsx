import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import ScrollToTop from './components/Scroll-To-Top.jsx';
import { LoaderProvider } from "./context/LoaderContext.jsx";
import { DroneProvider } from "./context/DroneContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <ScrollToTop />
      <LoaderProvider>
        <DroneProvider>
           <App />
        </DroneProvider>
      </LoaderProvider>
    </ThemeProvider>
  </BrowserRouter>
);

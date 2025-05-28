import "./App.scss";
import Routes from "./routes/Routes";
import FullscreenLoader from "./components/Fullscreen-loader";
import { useLoader } from "./context/LoaderContext";


function App() {
const { isLoading } = useLoader();
  return (
    <>
    {
      isLoading ? <FullscreenLoader /> : <Routes />
    }
    </>
    
  );
}

export default App;

import "./App.scss";
import Routes from "./routes/Routes";
import FullScreenLoader from "./components/FullScreen-Loader";
import { useLoader } from "./context/LoaderContext";


function App() {
const { isLoading } = useLoader();
  return (
    <>
    {
      isLoading ? <FullScreenLoader /> : <Routes />
    }
    </>
    
  );
}

export default App;

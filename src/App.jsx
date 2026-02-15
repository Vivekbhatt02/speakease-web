import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Navigation } from "./components/Navigation";

function App() {
    return (
      <BrowserRouter>
          <AppRoutes />
          <Navigation />
      </BrowserRouter>
    );
}

export default App;

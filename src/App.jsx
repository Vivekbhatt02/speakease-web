import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Navigation } from "./components/Navigation";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
    return (
      <AuthProvider>
          <BrowserRouter>
              <AppRoutes />
              <Navigation />
          </BrowserRouter>
      </AuthProvider>
    );
}

export default App;

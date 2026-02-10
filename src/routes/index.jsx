import {Routes, Route} from "react-router-dom";
import publicRoutes from "./publicRoutesConfig";
import privateRoutes from "./privateRoutesConfig";

function AppRoutes() {
    return (
      <Routes>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element}/>
          ))}
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element}/>
          ))}
      </Routes>
    );
}

export default AppRoutes;

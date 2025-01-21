import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { FormProvider } from "./contexts/FormContext";
import { AuthProvider } from "./contexts/AuthContext";
import { MedalProvider } from "./contexts/MedalContext";
import { CookieProvider } from "./contexts/CookieBarContext";

function App() {
  return (
    <AuthProvider>
      <FormProvider>
        <MedalProvider>
          <CookieProvider>
            <RouterProvider router={router} />
          </CookieProvider>
        </MedalProvider>
      </FormProvider>
    </AuthProvider>
  );
}

export default App;

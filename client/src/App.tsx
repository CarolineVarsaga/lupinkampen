import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { CookieProvider } from "./contexts/CookieBarProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { FormProvider } from "./contexts/FormProvider";
import { MedalProvider } from "./contexts/MedalProvider";

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

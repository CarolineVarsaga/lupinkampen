import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { FormProvider } from "./contexts/FormContext";
import { AuthProvider } from "./contexts/AuthContext";
import { MedalProvider } from "./contexts/MedalContext";

function App() {
  return (
    <AuthProvider>
      <FormProvider>
        <MedalProvider>
          <RouterProvider router={router} />
        </MedalProvider>
      </FormProvider>
    </AuthProvider>
  );
}

export default App;

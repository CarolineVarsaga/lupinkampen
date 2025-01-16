import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { FormProvider } from "./contexts/FormContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <FormProvider>
        <RouterProvider router={router} />
      </FormProvider>
    </AuthProvider>
  );
}

export default App;

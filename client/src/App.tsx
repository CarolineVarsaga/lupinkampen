import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { FormProvider } from "./contexts/FormContext";

function App() {
  return (
    <FormProvider>
      <RouterProvider router={router} />
    </FormProvider>
  );
}

export default App;

import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <div className="app-container">
        <AppRoutes />
      </div>

      <Toaster position="top-center" richColors closeButton />
    </>
  );
}

export default App;

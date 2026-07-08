import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@/presentation/pages/HomePage";
import { ContributePage } from "@/presentation/pages/ContributePage";
import { CartePage } from "@/presentation/pages/CartePage";
import { ImmersiveTestPage } from "@/presentation/pages/ImmersiveTestPage";
import { AuthProvider } from "@/presentation/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contribuer" element={<ContributePage />} />
          <Route path="/carte" element={<CartePage />} />
          <Route path="/test-immersif" element={<ImmersiveTestPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@/presentation/pages/HomePage";
import { ContributePage } from "@/presentation/pages/ContributePage";
import { CartePage } from "@/presentation/pages/CartePage";
import { ExplorerPage } from "@/presentation/pages/ExplorerPage";
import { CityDetailPage } from "@/presentation/pages/CityDetailPage";
import { SitesListPage } from "@/presentation/pages/explorer/SitesListPage";
import { SiteDetailPage } from "@/presentation/pages/explorer/SiteDetailPage";
import { PersonalitiesListPage } from "@/presentation/pages/explorer/PersonalitiesListPage";
import { HistoricalFigureDetailPage } from "@/presentation/pages/explorer/HistoricalFigureDetailPage";
import { RecitsListPage } from "@/presentation/pages/explorer/RecitsListPage";
import { StoryDetailPage } from "@/presentation/pages/explorer/StoryDetailPage";
import { EvenementsListPage } from "@/presentation/pages/explorer/EvenementsListPage";
import { EventDetailPage } from "@/presentation/pages/explorer/EventDetailPage";
import { TraditionsListPage } from "@/presentation/pages/explorer/TraditionsListPage";
import { TraditionDetailPage } from "@/presentation/pages/explorer/TraditionDetailPage";
import { JouerPage } from "@/presentation/pages/JouerPage";
import { ImmersiveTestPage } from "@/presentation/pages/ImmersiveTestPage";
import { AuthProvider } from "@/presentation/contexts/AuthContext";
import { AccountLayout } from "@/presentation/layouts/AccountLayout";
import { ProfilePage } from "@/presentation/pages/account/ProfilePage";
import { FavoritesPage } from "@/presentation/pages/account/FavoritesPage";
import { MyContributionsPage } from "@/presentation/pages/account/MyContributionsPage";
import { SettingsPage } from "@/presentation/pages/account/SettingsPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contribuer" element={<ContributePage />} />
          <Route path="/carte" element={<CartePage />} />

          <Route path="/explorer" element={<ExplorerPage />} />
          <Route path="/explorer/sites" element={<SitesListPage />} />
          <Route path="/explorer/sites/:siteId" element={<SiteDetailPage />} />
          <Route path="/explorer/personnalites" element={<PersonalitiesListPage />} />
          <Route
            path="/explorer/personnalites/:figureId"
            element={<HistoricalFigureDetailPage />}
          />
          <Route path="/explorer/recits" element={<RecitsListPage />} />
          <Route path="/explorer/recits/:storyId" element={<StoryDetailPage />} />
          <Route path="/explorer/evenements" element={<EvenementsListPage />} />
          <Route path="/explorer/evenements/:eventId" element={<EventDetailPage />} />
          <Route path="/explorer/traditions" element={<TraditionsListPage />} />
          <Route path="/explorer/traditions/:traditionId" element={<TraditionDetailPage />} />
          <Route path="/explorer/:cityId" element={<CityDetailPage />} />

          <Route path="/jouer" element={<JouerPage />} />
          <Route path="/test-immersif" element={<ImmersiveTestPage />} />
          <Route path="/compte" element={<AccountLayout />}>
            <Route index element={<ProfilePage />} />
            <Route path="favoris" element={<FavoritesPage />} />
            <Route path="contributions" element={<MyContributionsPage />} />
            <Route path="parametres" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

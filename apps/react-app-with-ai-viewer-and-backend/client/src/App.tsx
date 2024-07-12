import Join from "@/routes/join";
import Meeting from "@/routes/meeting";
import Meetings from "@/routes/meetings";
import NotFound from "@/routes/not-found";
import Root from "@/routes/root";
import Layout from "@/routes/layout";
import Settings from "@/routes/settings";

import { Routes, Route } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";
import { Provider } from 'jotai'

export default function App() {
  return (
    <Provider>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Root />} />
          <Route path="join" element={<Join />} />
          <Route path="meetings" element={<Meetings />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/meeting/:botId" element={<Meeting />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Provider>
  );
}

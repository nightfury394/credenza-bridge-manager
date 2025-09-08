import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Applications from "./pages/Applications";
import Universities from "./pages/Universities";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="applications" element={<Applications />} />
            <Route path="universities" element={<Universities />} />
            <Route path="scholarships" element={<div className="p-6">Scholarships page coming soon...</div>} />
            <Route path="counselors" element={<div className="p-6">Counselors page coming soon...</div>} />
            <Route path="content" element={<div className="p-6">Content management coming soon...</div>} />
            <Route path="payments" element={<div className="p-6">Payments page coming soon...</div>} />
            <Route path="analytics" element={<div className="p-6">Analytics page coming soon...</div>} />
            <Route path="settings" element={<div className="p-6">Settings page coming soon...</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

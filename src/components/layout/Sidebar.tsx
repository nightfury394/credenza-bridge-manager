import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  GraduationCap, 
  Award,
  UserCheck,
  BookOpen,
  CreditCard,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", labelBn: "ড্যাশবোর্ড" },
  { icon: Users, label: "Students", href: "/students", labelBn: "শিক্ষার্থীরা" },
  { icon: FileText, label: "Applications", href: "/applications", labelBn: "আবেদনসমূহ" },
  { icon: GraduationCap, label: "Universities", href: "/universities", labelBn: "বিশ্ববিদ্যালয়" },
  { icon: Award, label: "Scholarships", href: "/scholarships", labelBn: "বৃত্তি" },
  { icon: UserCheck, label: "Counselors", href: "/counselors", labelBn: "পরামর্শদাতা" },
  { icon: BookOpen, label: "Content", href: "/content", labelBn: "কন্টেন্ট" },
  { icon: CreditCard, label: "Payments", href: "/payments", labelBn: "পেমেন্ট" },
  { icon: BarChart3, label: "Analytics", href: "/analytics", labelBn: "অ্যানালিটিক্স" },
  { icon: Settings, label: "Settings", href: "/settings", labelBn: "সেটিংস" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  };

  return (
    <div className={cn(
      "flex flex-col h-screen bg-dashboard-sidebar border-r border-dashboard-sidebar-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-dashboard-sidebar-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-sm">Credenza</span>
              <span className="text-dashboard-sidebar-item text-xs">Education</span>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-dashboard-sidebar-item hover:text-white hover:bg-dashboard-sidebar-border"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive 
                  ? "bg-primary text-white shadow-lg" 
                  : "text-dashboard-sidebar-item hover:text-white hover:bg-dashboard-sidebar-border"
              )}
            >
              <item.icon className={cn("w-5 h-5", collapsed && "mx-auto")} />
              {!collapsed && (
                <span className="font-medium">
                  {language === 'en' ? item.label : item.labelBn}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Language Toggle */}
      <div className="p-4 border-t border-dashboard-sidebar-border">
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "sm"}
          onClick={toggleLanguage}
          className="w-full text-dashboard-sidebar-item hover:text-white hover:bg-dashboard-sidebar-border"
        >
          <Globe className="w-4 h-4" />
          {!collapsed && (
            <span className="ml-2">{language === 'en' ? 'বাংলা' : 'English'}</span>
          )}
        </Button>
      </div>
    </div>
  );
}
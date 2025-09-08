import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileText, 
  GraduationCap, 
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const kpiData = [
  {
    title: "Total Students",
    value: "1,234",
    change: "+12%",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Active Applications",
    value: "456",
    change: "+8%",
    icon: FileText,
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    title: "Partner Universities",
    value: "89",
    change: "+3%",
    icon: GraduationCap,
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    title: "Available Scholarships",
    value: "234",
    change: "+15%",
    icon: Award,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  }
];

const recentActivities = [
  {
    id: 1,
    type: "new_student",
    message: "New student registration: Rashida Rahman",
    time: "2 minutes ago",
    icon: Users,
    color: "text-primary"
  },
  {
    id: 2,
    type: "application_update",
    message: "Application submitted for University of Warsaw",
    time: "15 minutes ago",
    icon: FileText,
    color: "text-success"
  },
  {
    id: 3,
    type: "payment",
    message: "Payment received from Md. Karim Ahmed",
    time: "1 hour ago",
    icon: CheckCircle,
    color: "text-green-600"
  },
  {
    id: 4,
    type: "deadline",
    message: "Application deadline approaching for 5 students",
    time: "2 hours ago",
    icon: AlertCircle,
    color: "text-orange-600"
  }
];

const notifications = [
  {
    id: 1,
    title: "Document Verification Pending",
    message: "12 student documents require verification",
    priority: "high",
    time: "Just now"
  },
  {
    id: 2,
    title: "Visa Appointment Reminder",
    message: "3 students have visa appointments tomorrow",
    priority: "medium",
    time: "30 minutes ago"
  },
  {
    id: 3,
    title: "New University Partnership",
    message: "Technical University of Berlin confirmed partnership",
    priority: "low",
    time: "2 hours ago"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your education management overview.</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <TrendingUp className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-success" />
                    <span className="text-xs text-success">{kpi.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50">
                  <div className={`p-2 rounded-full bg-muted`}>
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>Important Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-semibold">{notification.title}</h4>
                        <Badge 
                          variant={notification.priority === 'high' ? 'destructive' : 
                                  notification.priority === 'medium' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {notification.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
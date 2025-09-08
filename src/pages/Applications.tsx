import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus,
  Calendar,
  User,
  GraduationCap,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

const applicationStages = [
  { id: "new", title: "New", color: "bg-status-new", count: 12 },
  { id: "qualified", title: "Qualified", color: "bg-status-qualified", count: 8 },
  { id: "applied", title: "Applied", color: "bg-status-applied", count: 15 },
  { id: "visa", title: "Visa Process", color: "bg-status-visa", count: 6 },
  { id: "enrolled", title: "Enrolled", color: "bg-status-enrolled", count: 23 }
];

const applicationsData = {
  new: [
    {
      id: 1,
      studentName: "Rashida Rahman",
      university: "Technical University of Berlin",
      program: "Computer Science",
      deadline: "2024-03-15",
      priority: "high",
      documents: ["Transcript", "SOP"],
      missingDocs: ["LOR", "IELTS"]
    },
    {
      id: 2,
      studentName: "Md. Karim Ahmed",
      university: "University of Warsaw",
      program: "Business Administration",
      deadline: "2024-03-20",
      priority: "medium",
      documents: ["Transcript", "IELTS"],
      missingDocs: ["SOP", "LOR"]
    }
  ],
  qualified: [
    {
      id: 3,
      studentName: "Fatima Begum",
      university: "Charles University",
      program: "Medicine",
      deadline: "2024-03-10",
      priority: "high",
      documents: ["All Complete"],
      missingDocs: []
    }
  ],
  applied: [
    {
      id: 4,
      studentName: "Ahmed Hassan",
      university: "University of Vienna",
      program: "Engineering",
      deadline: "2024-04-01",
      priority: "medium",
      documents: ["All Complete"],
      missingDocs: []
    }
  ],
  visa: [
    {
      id: 5,
      studentName: "Sarah Ahmed",
      university: "ETH Zurich",
      program: "Data Science",
      deadline: "2024-03-25",
      priority: "high",
      documents: ["All Complete"],
      missingDocs: []
    }
  ],
  enrolled: [
    {
      id: 6,
      studentName: "Rahman Ali",
      university: "University of Munich",
      program: "Physics",
      deadline: "Completed",
      priority: "low",
      documents: ["All Complete"],
      missingDocs: []
    }
  ]
};

const priorityColors = {
  high: "border-red-500 bg-red-50",
  medium: "border-yellow-500 bg-yellow-50",
  low: "border-green-500 bg-green-50"
};

export default function Applications() {
  const [draggedItem, setDraggedItem] = useState<any>(null);

  const handleDragStart = (e: React.DragEvent, application: any, fromStage: string) => {
    setDraggedItem({ application, fromStage });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, toStage: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem.fromStage !== toStage) {
      // In a real app, this would update the database
      console.log(`Moving application from ${draggedItem.fromStage} to ${toStage}`);
    }
    setDraggedItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Application Tracking</h1>
          <p className="text-muted-foreground">Track student applications through the admission pipeline.</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          New Application
        </Button>
      </div>

      {/* Pipeline Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {applicationStages.map((stage) => (
          <Card key={stage.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stage.title}</p>
                  <p className="text-2xl font-bold">{stage.count}</p>
                </div>
                <div className={cn("w-3 h-8 rounded-full", stage.color)}></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 min-h-[600px]">
        {applicationStages.map((stage) => (
          <div
            key={stage.id}
            className="space-y-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <div className={cn("w-3 h-3 rounded-full", stage.color)}></div>
                <h3 className="font-semibold text-sm">{stage.title}</h3>
              </div>
              <Badge variant="secondary">{applicationsData[stage.id as keyof typeof applicationsData]?.length || 0}</Badge>
            </div>

            {/* Applications */}
            <div className="space-y-3">
              {applicationsData[stage.id as keyof typeof applicationsData]?.map((application) => (
                <Card
                  key={application.id}
                  className={cn(
                    "cursor-move hover:shadow-md transition-shadow border-l-4",
                    priorityColors[application.priority as keyof typeof priorityColors]
                  )}
                  draggable
                  onDragStart={(e) => handleDragStart(e, application, stage.id)}
                >
                  <CardContent className="p-4 space-y-3">
                    {/* Student Info */}
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-sm">{application.studentName}</span>
                    </div>

                    {/* University */}
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4 text-muted-foreground" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{application.university}</p>
                        <p className="text-xs text-muted-foreground">{application.program}</p>
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{application.deadline}</span>
                    </div>

                    {/* Documents Status */}
                    <div className="space-y-2">
                      {application.documents.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-success" />
                          <span className="text-xs text-success">
                            {application.documents.join(", ")}
                          </span>
                        </div>
                      )}
                      {application.missingDocs.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3 text-destructive" />
                          <span className="text-xs text-destructive">
                            Missing: {application.missingDocs.join(", ")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Priority Badge */}
                    <div className="flex justify-between items-center">
                      <Badge 
                        variant={application.priority === 'high' ? 'destructive' : 
                                application.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {application.priority}
                      </Badge>
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <FileText className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Application */}
            <Button 
              variant="ghost" 
              className="w-full border-2 border-dashed border-muted-foreground/25 h-20 hover:border-primary hover:bg-primary/5"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Application
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
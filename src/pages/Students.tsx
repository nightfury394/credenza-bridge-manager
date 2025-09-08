import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Filter,
  UserPlus,
  Download,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const studentsData = [
  {
    id: 1,
    name: "Rashida Rahman",
    email: "rashida@email.com",
    phone: "+880 1712345678",
    status: "active",
    stage: "Applied",
    country: "Germany",
    university: "Technical University of Berlin",
    gpa: "3.8",
    ielts: "7.5",
    joinDate: "2024-01-15",
    counselor: "Sarah Ahmed"
  },
  {
    id: 2,
    name: "Md. Karim Ahmed",
    email: "karim@email.com",
    phone: "+880 1798765432",
    status: "active",
    stage: "Qualified",
    country: "Poland",
    university: "University of Warsaw",
    gpa: "3.6",
    ielts: "6.5",
    joinDate: "2024-02-03",
    counselor: "Ahmed Hassan"
  },
  {
    id: 3,
    name: "Fatima Begum",
    email: "fatima@email.com",
    phone: "+880 1587654321",
    status: "inactive",
    stage: "New",
    country: "Czech Republic",
    university: "Charles University",
    gpa: "3.4",
    ielts: "6.0",
    joinDate: "2024-02-20",
    counselor: "Sarah Ahmed"
  }
];

const statusColors = {
  active: "bg-success text-success-foreground",
  inactive: "bg-muted text-muted-foreground",
  pending: "bg-accent text-accent-foreground"
};

const stageColors = {
  "New": "bg-status-new text-white",
  "Qualified": "bg-status-qualified text-white",
  "Applied": "bg-status-applied text-white",
  "Visa": "bg-status-visa text-white",
  "Enrolled": "bg-status-enrolled text-white"
};

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    const matchesCountry = countryFilter === "all" || student.country === countryFilter;
    
    return matchesSearch && matchesStatus && matchesCountry;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground">Manage and track all student applications and progress.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="Poland">Poland</SelectItem>
                <SelectItem value="Czech Republic">Czech Republic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="grid gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold">{student.name}</h3>
                      <Badge className={statusColors[student.status as keyof typeof statusColors]}>
                        {student.status}
                      </Badge>
                      <Badge className={stageColors[student.stage as keyof typeof stageColors]}>
                        {student.stage}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{student.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{student.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{student.country}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{student.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium">{student.university}</p>
                    <div className="flex space-x-4 text-xs text-muted-foreground">
                      <span>GPA: {student.gpa}</span>
                      <span>IELTS: {student.ielts}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Counselor: {student.counselor}</p>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem>View Applications</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-2">
              <p className="text-lg font-medium text-muted-foreground">No students found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
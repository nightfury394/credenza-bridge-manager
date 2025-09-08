import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Plus,
  MapPin,
  Star,
  Users,
  BookOpen,
  Award,
  ExternalLink,
  Edit,
  Trash2,
  MoreHorizontal
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

const universitiesData = [
  {
    id: 1,
    name: "Technical University of Berlin",
    country: "Germany",
    city: "Berlin",
    logo: "🏛️",
    partner: true,
    ranking: 15,
    students: 1250,
    programs: 45,
    scholarships: 12,
    tuitionRange: "€500-2000/semester",
    description: "Leading technical university in Germany with strong engineering programs.",
    website: "https://tu-berlin.de",
    applicationDeadline: "March 15, 2024",
    intakes: ["September", "February"]
  },
  {
    id: 2,
    name: "University of Warsaw",
    country: "Poland",
    city: "Warsaw",
    logo: "🎓",
    partner: true,
    ranking: 25,
    students: 890,
    programs: 32,
    scholarships: 8,
    tuitionRange: "€2000-4000/year",
    description: "Premier university in Poland with excellent research opportunities.",
    website: "https://uw.edu.pl",
    applicationDeadline: "April 1, 2024",
    intakes: ["October"]
  },
  {
    id: 3,
    name: "Charles University",
    country: "Czech Republic",
    city: "Prague",
    logo: "🏫",
    partner: false,
    ranking: 32,
    students: 456,
    programs: 28,
    scholarships: 5,
    tuitionRange: "€3000-6000/year",
    description: "Historic university with strong medical and science programs.",
    website: "https://cuni.cz",
    applicationDeadline: "February 28, 2024",
    intakes: ["September"]
  },
  {
    id: 4,
    name: "ETH Zurich",
    country: "Switzerland",
    city: "Zurich",
    logo: "⭐",
    partner: true,
    ranking: 8,
    students: 234,
    programs: 18,
    scholarships: 15,
    tuitionRange: "CHF 1500/semester",
    description: "World-renowned institute for technology and science.",
    website: "https://ethz.ch",
    applicationDeadline: "December 15, 2023",
    intakes: ["September", "February"]
  }
];

export default function Universities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [partnerFilter, setPartnerFilter] = useState("all");

  const filteredUniversities = universitiesData.filter(university => {
    const matchesSearch = university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         university.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = countryFilter === "all" || university.country === countryFilter;
    const matchesPartner = partnerFilter === "all" || 
                          (partnerFilter === "partner" && university.partner) ||
                          (partnerFilter === "non-partner" && !university.partner);
    
    return matchesSearch && matchesCountry && matchesPartner;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Universities</h1>
          <p className="text-muted-foreground">Manage university partnerships and program offerings.</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add University
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Universities</p>
                <p className="text-2xl font-bold">{universitiesData.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Partner Universities</p>
                <p className="text-2xl font-bold">{universitiesData.filter(u => u.partner).length}</p>
              </div>
              <Star className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Programs</p>
                <p className="text-2xl font-bold">{universitiesData.reduce((sum, u) => sum + u.programs, 0)}</p>
              </div>
              <Users className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available Scholarships</p>
                <p className="text-2xl font-bold">{universitiesData.reduce((sum, u) => sum + u.scholarships, 0)}</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search universities or cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="Poland">Poland</SelectItem>
                <SelectItem value="Czech Republic">Czech Republic</SelectItem>
                <SelectItem value="Switzerland">Switzerland</SelectItem>
              </SelectContent>
            </Select>
            <Select value={partnerFilter} onValueChange={setPartnerFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Partnership status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Universities</SelectItem>
                <SelectItem value="partner">Partners Only</SelectItem>
                <SelectItem value="non-partner">Non-Partners</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Universities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUniversities.map((university) => (
          <Card key={university.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{university.logo}</div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{university.name}</CardTitle>
                      {university.partner && (
                        <Badge className="bg-success text-success-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          Partner
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{university.city}, {university.country}</span>
                      <span className="mx-2">•</span>
                      <span>Rank #{university.ranking}</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Website
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <p className="text-sm text-muted-foreground">{university.description}</p>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">{university.students}</p>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-success">{university.programs}</p>
                  <p className="text-xs text-muted-foreground">Programs</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-accent">{university.scholarships}</p>
                  <p className="text-xs text-muted-foreground">Scholarships</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tuition:</span>
                  <span className="font-medium">{university.tuitionRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deadline:</span>
                  <span className="font-medium">{university.applicationDeadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Intakes:</span>
                  <span className="font-medium">{university.intakes.join(", ")}</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Programs
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Website
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUniversities.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-2">
              <p className="text-lg font-medium text-muted-foreground">No universities found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
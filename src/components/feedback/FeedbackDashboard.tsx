
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

interface FeedbackItem {
  id: string;
  name: string;
  email: string;
  message: string;
  category: string;
  timestamp: string;
}

const COLORS = ['#8B5CF6', '#F87171', '#14B8A6'];
const CATEGORY_COLORS = {
  suggestion: '#8B5CF6',
  bug: '#F87171',
  feature: '#14B8A6'
};

export const FeedbackDashboard = () => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [filteredFeedback, setFilteredFeedback] = useState<FeedbackItem[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('newest');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Load feedback data from localStorage
  useEffect(() => {
    const storedFeedback = localStorage.getItem('feedbackData');
    if (storedFeedback) {
      const parsedFeedback = JSON.parse(storedFeedback);
      setFeedback(parsedFeedback);
      setFilteredFeedback(parsedFeedback);
    }
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...feedback];

    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(item => item.category === categoryFilter);
    }

    // Apply search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        item => 
          item.name.toLowerCase().includes(searchLower) ||
          item.email.toLowerCase().includes(searchLower) ||
          item.message.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      }
    });

    setFilteredFeedback(result);
  }, [feedback, categoryFilter, sortOrder, searchTerm]);

  // Compute chart data
  const chartData = feedback.reduce((acc, item) => {
    const existingCategory = acc.find(d => d.name === item.category);
    if (existingCategory) {
      existingCategory.value += 1;
    } else {
      acc.push({
        name: item.category,
        value: 1
      });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'suggestion':
        return <Badge className="bg-suggestion">Suggestion</Badge>;
      case 'bug':
        return <Badge className="bg-bug">Bug Report</Badge>;
      case 'feature':
        return <Badge className="bg-feature">Feature Request</Badge>;
      default:
        return <Badge>{category}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Analytics Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Feedback Analytics</CardTitle>
            <CardDescription>
              Distribution by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            {feedback.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No feedback data available
              </div>
            )}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Total Feedback: {feedback.length}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Filter Card */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Filter & Search</CardTitle>
            <CardDescription>
              Find specific feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="suggestion">Suggestions</SelectItem>
                  <SelectItem value="bug">Bug Reports</SelectItem>
                  <SelectItem value="feature">Feature Requests</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={sortOrder}
                onValueChange={setSortOrder}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">
          Feedback Entries {filteredFeedback.length > 0 && `(${filteredFeedback.length})`}
        </h3>
        
        {filteredFeedback.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredFeedback.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getCategoryBadge(item.category)}
                        <span className="text-sm text-gray-500">
                          {formatDate(item.timestamp)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{item.email}</p>
                      <p className="text-gray-700">{item.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 mb-4">No feedback entries found.</p>
              <Button variant="outline" onClick={() => {
                setCategoryFilter('all');
                setSortOrder('newest');
                setSearchTerm('');
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

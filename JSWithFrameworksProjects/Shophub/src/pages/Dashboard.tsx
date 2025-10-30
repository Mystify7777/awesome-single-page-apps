import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, Users, Package, DollarSign, TrendingUp, Star, Eye, ShoppingCart, Zap, Target, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive: boolean;
}

interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  category: string;
}

const metrics: MetricCard[] = [
  {
    title: "Total Revenue",
    value: "$12,847",
    change: "+12.5%",
    icon: <DollarSign className="w-6 h-6" />,
    positive: true
  },
  {
    title: "Orders",
    value: "1,247",
    change: "+8.2%",
    icon: <Package className="w-6 h-6" />,
    positive: true
  },
  {
    title: "Customers",
    value: "3,891",
    change: "+15.3%",
    icon: <Users className="w-6 h-6" />,
    positive: true
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "-0.8%",
    icon: <TrendingUp className="w-6 h-6" />,
    positive: false
  }
];

const goals: Goal[] = [
  { id: "1", title: "Monthly Sales Target", current: 85, target: 100, category: "Sales" },
  { id: "2", title: "Customer Satisfaction", current: 92, target: 95, category: "Service" },
  { id: "3", title: "Product Views", current: 78, target: 100, category: "Marketing" },
  { id: "4", title: "Return Rate Reduction", current: 65, target: 80, category: "Quality" }
];

const recentActivity = [
  { id: "1", action: "New order #ORD-789", time: "2 minutes ago", type: "order" },
  { id: "2", action: "Product 'Wireless Headphones' viewed 50+ times", time: "5 minutes ago", type: "view" },
  { id: "3", action: "Customer feedback received (5 stars)", time: "15 minutes ago", type: "feedback" },
  { id: "4", action: "Low stock alert: 'Smart Watch'", time: "1 hour ago", type: "alert" },
  { id: "5", action: "New customer registration", time: "2 hours ago", type: "customer" }
];

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingCart className="w-4 h-4 text-success" />;
      case 'view': return <Eye className="w-4 h-4 text-primary" />;
      case 'feedback': return <Star className="w-4 h-4 text-accent" />;
      case 'alert': return <Zap className="w-4 h-4 text-destructive" />;
      case 'customer': return <Users className="w-4 h-4 text-secondary" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, John!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-success/10 text-success">Live</Badge>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-gradient-card hover:shadow-product transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className={`text-sm ${metric.positive ? 'text-success' : 'text-destructive'}`}>
                      {metric.change} from last month
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    {metric.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-primary/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-lg font-semibold text-foreground">Interactive Chart</p>
                      <p className="text-muted-foreground">Revenue trends over time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Premium Wireless Headphones", sales: 847, trend: "+15%" },
                      { name: "Smart Fitness Watch", sales: 623, trend: "+8%" },
                      { name: "Professional Camera Lens", sales: 456, trend: "+23%" },
                      { name: "Luxury Leather Jacket", sales: 389, trend: "+12%" }
                    ].map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                        </div>
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          {product.trend}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal) => (
                <Card key={goal.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <Badge variant="outline">{goal.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium">{goal.current}% / {goal.target}%</span>
                      </div>
                      <Progress value={goal.current} className="h-3" />
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {goal.target - goal.current}% remaining to reach target
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 rounded-lg transition-colors">
                      <div className="p-2 bg-muted rounded-lg">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-primary text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Award className="w-12 h-12 bg-white/20 p-2 rounded-lg" />
                    <div>
                      <h3 className="text-lg font-semibold">Best Month Ever!</h3>
                      <p className="text-white/80">You've exceeded your monthly target by 15%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-hero text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <TrendingUp className="w-12 h-12 bg-white/20 p-2 rounded-lg" />
                    <div>
                      <h3 className="text-lg font-semibold">Growing Fast</h3>
                      <p className="text-white/80">Customer base increased by 23% this quarter</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-success text-success-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Star className="w-12 h-12 bg-white/20 p-2 rounded-lg" />
                    <div>
                      <h3 className="text-lg font-semibold">5-Star Rating</h3>
                      <p className="text-white/80">Maintaining excellent customer satisfaction</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
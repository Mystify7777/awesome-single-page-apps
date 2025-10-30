import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, MapPin, Phone, Mail, Calendar, Heart, Package, Settings, Star, Crown, Zap, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface OrderHistory {
  id: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing';
  total: number;
  items: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
}

const mockOrderHistory: OrderHistory[] = [
  { id: "ORD-001", date: "2024-01-15", status: "delivered", total: 299.99, items: 2 },
  { id: "ORD-002", date: "2024-01-10", status: "delivered", total: 129.99, items: 1 },
  { id: "ORD-003", date: "2024-01-05", status: "shipped", total: 89.99, items: 3 },
  { id: "ORD-004", date: "2024-01-01", status: "processing", total: 199.99, items: 1 },
];

const achievements: Achievement[] = [
  { id: "1", title: "First Purchase", description: "Made your first order", icon: <Trophy className="w-6 h-6" />, unlocked: true },
  { id: "2", title: "Loyal Customer", description: "10+ orders completed", icon: <Crown className="w-6 h-6" />, unlocked: true, progress: 80 },
  { id: "3", title: "Speed Shopper", description: "Quick checkout master", icon: <Zap className="w-6 h-6" />, unlocked: false, progress: 60 },
];

export const Profile: React.FC = () => {
  const [wishlistCount] = useState(12);
  const [loyaltyPoints] = useState(2450);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-success text-success-foreground';
      case 'shipped': return 'bg-primary text-primary-foreground';
      case 'processing': return 'bg-accent text-accent-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8 bg-gradient-primary text-white overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-white/20">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback className="text-primary text-2xl">JD</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">John Doe</h2>
                <p className="text-white/80 mb-4">Premium Member since 2023</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4" />
                      <span className="text-sm text-white/80">Loyalty Points</span>
                    </div>
                    <p className="text-2xl font-bold">{loyaltyPoints.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="w-4 h-4" />
                      <span className="text-sm text-white/80">Total Orders</span>
                    </div>
                    <p className="text-2xl font-bold">{mockOrderHistory.length}</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm text-white/80">Wishlist Items</span>
                    </div>
                    <p className="text-2xl font-bold">{wishlistCount}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Link to="/dashboard">
                  <Button variant="secondary" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrderHistory.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <Package className="w-8 h-8 text-muted-foreground" />
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.items} items • {order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <p className="font-bold">${order.total}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className={`p-4 border rounded-lg ${achievement.unlocked ? 'bg-success/5 border-success/20' : 'bg-muted/20'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}`}>
                          {achievement.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                      {achievement.progress && (
                        <div className="mt-3">
                          <Progress value={achievement.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">{achievement.progress}% complete</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist ({wishlistCount} items)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Your wishlist is growing!</h3>
                  <p className="text-muted-foreground mb-4">You have {wishlistCount} items saved for later.</p>
                  <Link to="/">
                    <Button>Browse Products</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">john.doe@example.com</p>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">+1 (555) 123-4567</p>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                    </div>
                  </div>
                  <Button className="w-full">Edit Information</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Email Notifications</span>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Privacy Settings</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Payment Methods</span>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shipping Addresses</span>
                    <Button variant="outline" size="sm">Edit</Button>
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
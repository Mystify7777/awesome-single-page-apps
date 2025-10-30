import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, X, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'Live Chat',
      color: 'bg-primary hover:bg-primary-hover',
      action: () => console.log('Opening live chat...')
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Call Support',
      color: 'bg-success hover:bg-success/80',
      action: () => console.log('Calling support...')
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email Us',
      color: 'bg-accent hover:bg-accent/80',
      action: () => console.log('Opening email...')
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Items */}
      {isOpen && (
        <div className="mb-4 space-y-2 animate-slide-up">
          {actions.map((action, index) => (
            <Card key={index} className="shadow-elegant">
              <CardContent className="p-0">
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 p-4 ${action.color} text-white hover:text-white`}
                  onClick={action.action}
                >
                  {action.icon}
                  <span className="whitespace-nowrap">{action.label}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <Button
        size="icon"
        className={`w-14 h-14 rounded-full shadow-elegant transition-all duration-300 ${
          isOpen 
            ? 'bg-destructive hover:bg-destructive/80 rotate-45' 
            : 'bg-primary hover:bg-primary-hover hover:scale-110'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Headphones className="w-6 h-6 text-white" />
        )}
      </Button>
    </div>
  );
};
import React from 'react';
import { Plus, MessageSquare } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useNavigate } from 'react-router-dom';

const Messages: React.FC = () => {
  const navigate = useNavigate();

  const messages = [
    {
      id: 1,
      title: 'Meeting Reminder',
      sender: 'John Doe',
      date: '2024-03-01',
      content: 'Don’t forget our team meeting tomorrow at 10 AM.',
    },
    {
      id: 2,
      title: 'Task Update',
      sender: 'Jane Smith',
      date: '2024-02-28',
      content: 'The API integration task is now completed.',
    },
    {
      id: 3,
      title: 'Client Feedback',
      sender: 'Mike Johnson',
      date: '2024-02-27',
      content: 'Received positive feedback from the client.',
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <Button onClick={() => navigate('/messages/new')}>
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{message.title}</h4>
                  <p className="text-sm text-muted-foreground">{message.content}</p>
                  <p className="text-sm text-muted-foreground">From: {message.sender}</p>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {message.date}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Messages;

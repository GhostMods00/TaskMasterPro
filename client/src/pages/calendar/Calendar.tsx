import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const Calendar: React.FC = () => {
  const events = [
    { title: 'Team Meeting', date: '2024-03-01' },
    { title: 'Project Deadline', date: '2024-03-15' },
    { title: 'Client Demo', date: '2024-03-20' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md">+ New Event</button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Date: {event.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const Team: React.FC = () => {
  const teamMembers = [
    { name: 'John Doe', role: 'Developer', email: 'john@example.com' },
    { name: 'Jane Smith', role: 'Designer', email: 'jane@example.com' },
    { name: 'Mike Johnson', role: 'Project Manager', email: 'mike@example.com' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Team</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md">+ Add Member</button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.email}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Team;

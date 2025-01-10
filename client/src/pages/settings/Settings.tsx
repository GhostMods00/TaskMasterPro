import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const Settings: React.FC = () => {
  const settingsOptions = [
    { id: 1, name: 'Profile Settings', description: 'Manage your personal information and account details.' },
    { id: 2, name: 'Notification Preferences', description: 'Customize how and when you receive notifications.' },
    { id: 3, name: 'Privacy Settings', description: 'Adjust your privacy preferences and data sharing options.' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <div className="space-y-4">
        {settingsOptions.map((option) => (
          <Card key={option.id}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{option.name}</h4>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                <SettingsIcon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Settings;

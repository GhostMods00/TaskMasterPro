import React from 'react';
import { Plus, BarChart2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const Reports: React.FC = () => {
  const reports = [
    { id: 1, title: 'Monthly Report', date: '2024-03-01', description: 'Overview of project progress and performance.' },
    { id: 2, title: 'Weekly Summary', date: '2024-02-28', description: 'Highlights of the week’s tasks and updates.' },
    { id: 3, title: 'Task Analysis', date: '2024-02-25', description: 'Detailed analysis of task completion and bottlenecks.' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Report
        </Button>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{report.title}</h4>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <BarChart2 className="h-4 w-4 mr-1" />
                  {report.date}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;

import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const Help: React.FC = () => {
  const faqs = [
    { id: 1, question: 'How do I create a new project?', answer: 'Click on the "Create New Project" button on the Projects page.' },
    { id: 2, question: 'How do I add team members?', answer: 'Navigate to the Team page and click on "Add Member".' },
    { id: 3, question: 'How can I generate reports?', answer: 'Go to the Reports page and click on "Add Report".' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Help</h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <Card key={faq.id}>
            <CardContent>
              <div>
                <h4 className="font-medium">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Help;

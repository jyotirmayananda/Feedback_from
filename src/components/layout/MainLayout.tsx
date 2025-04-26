
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeedbackForm } from '../feedback/FeedbackForm';
import { FeedbackDashboard } from '../feedback/FeedbackDashboard';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">User Feedback System</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share your thoughts, suggestions, bug reports, and feature requests with us.
            We value your feedback!
          </p>
        </header>

        <main>
          <Tabs defaultValue="submit" className="w-full">
            <TabsList className="grid grid-cols-2 mb-8 w-full max-w-md mx-auto">
              <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            </TabsList>
            <TabsContent value="submit" className="mt-0">
              <FeedbackForm />
            </TabsContent>
            <TabsContent value="dashboard" className="mt-0">
              <FeedbackDashboard />
            </TabsContent>
          </Tabs>
        </main>

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© 2025 User Feedback System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

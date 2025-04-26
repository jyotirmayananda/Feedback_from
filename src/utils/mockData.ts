interface FeedbackItem {
  id: string;
  name: string;
  email: string;
  message: string;
  category: "suggestion" | "bug" | "feature";
  timestamp: string;
}

export const initializeMockData = () => {
  if (!localStorage.getItem("feedbackData")) {
    const mockFeedback: FeedbackItem[] = [
      {
        id: "1",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        message:
          "I love the new dashboard design, but it would be great if we could customize the widgets.",
        category: "suggestion",
        timestamp: "2025-03-15T09:24:00Z",
      },
      {
        id: "2",
        name: "John Doe",
        email: "john.doe@example.com",
        message:
          "The export feature crashes when I try to download the CSV file.",
        category: "bug",
        timestamp: "2025-03-18T14:35:00Z",
      },
      {
        id: "3",
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        message:
          "Could you add a dark mode option? It would be easier on the eyes during late-night work sessions.",
        category: "feature",
        timestamp: "2025-03-20T18:12:00Z",
      },
      {
        id: "4",
        name: "Mike Williams",
        email: "mike.w@example.com",
        message:
          "The mobile responsiveness needs improvement. Some buttons are hard to tap on smaller screens.",
        category: "bug",
        timestamp: "2025-03-22T11:05:00Z",
      },
      {
        id: "5",
        name: "Alex Rivera",
        email: "alex.r@example.com",
        message:
          "I would love to see integration with calendar apps like Google Calendar or Outlook.",
        category: "feature",
        timestamp: "2025-03-25T16:42:00Z",
      },
    ];

    localStorage.setItem("feedbackData", JSON.stringify(mockFeedback));
  }
};

import { ConversationSession } from "../types/assistant.types";

export const INITIAL_CONVERSATIONS: ConversationSession[] = [
  {
    id: "session-ai-community",
    title: "AI Community Overview",
    preview: "What exactly is an AI community, and what happens inside one?",
    createdAt: "Just now",
    updatedAt: "Just now",
    messages: [
      {
        id: "msg-1",
        sender: "user",
        text: "What exactly is an AI community, and what happens inside one?",
        timestamp: "9:41 AM",
      },
      {
        id: "msg-2",
        sender: "assistant",
        text: "An AI community is a collaborative network of developers, researchers, designers, and enthusiasts who share knowledge about artificial intelligence. Members typically discuss recent model breakthroughs, troubleshoot code, share open-source datasets, and collaborate on real-world projects.",
        timestamp: "9:41 AM",
      },
      {
        id: "msg-3",
        sender: "user",
        text: "Where can I find active and beginner friendly AI communities?",
        timestamp: "9:42 AM",
      },
    ],
  },
  {
    id: "session-boarding-house",
    title: "Student Boarding House Map",
    preview: "Could you please make a visualization map of the boarding house area near campus?",
    createdAt: "2 hours ago",
    updatedAt: "2 hours ago",
    messages: [
      {
        id: "msg-bh-1",
        sender: "user",
        text: "Could you please make a visualization map of the boarding house area near campus?",
        timestamp: "7:15 AM",
      },
      {
        id: "msg-bh-2",
        sender: "assistant",
        text: "I've structured a geospatial overview of the boarding houses surrounding the campus. The dataset maps 4 key residential clusters, walking distances (5-15 mins), estimated monthly rates, and essential student facilities like study cafes and transit stops.",
        timestamp: "7:16 AM",
      },
    ],
  },
  {
    id: "session-ux-research",
    title: "Onboarding UX Research",
    preview: "Summarize the main points of the UX research document I uploaded earlier.",
    createdAt: "Yesterday",
    updatedAt: "Yesterday",
    messages: [
      {
        id: "msg-ux-1",
        sender: "user",
        text: "Summarize the main points of the UX research document I uploaded earlier.",
        timestamp: "Yesterday",
      },
      {
        id: "msg-ux-2",
        sender: "assistant",
        text: "Key findings from the onboarding study:\n1. Friction Point: Drop-offs peak at step 3 when requesting optional permissions.\n2. User Preference: 78% of tested participants preferred contextual micro-animations over multi-page tooltips.\n3. Recommendation: Implement progressive disclosure and a real-time progress bar to improve completion by ~30%.",
        timestamp: "Yesterday",
      },
    ],
  },
  {
    id: "session-basic-sql",
    title: "Learn Basic SQL",
    preview: "Explain the difference between INNER JOIN and LEFT JOIN with a simple example.",
    createdAt: "2 days ago",
    updatedAt: "2 days ago",
    messages: [
      {
        id: "msg-sql-1",
        sender: "user",
        text: "Explain the difference between INNER JOIN and LEFT JOIN with a simple example.",
        timestamp: "2 days ago",
      },
      {
        id: "msg-sql-2",
        sender: "assistant",
        text: "Here is the core distinction:\n\n• **INNER JOIN**: Only returns records that have matching values in both tables.\n• **LEFT JOIN**: Returns ALL records from the left table, and the matched records from the right table (unmatched fields return NULL).\n\n**Quick Example:**\nIf `Users` has Alice & Bob, but only Alice has an `Orders` record:\n- `INNER JOIN` outputs only Alice.\n- `LEFT JOIN` outputs Alice (with order details) and Bob (with `NULL` order).",
        timestamp: "2 days ago",
      },
    ],
  },
  {
    id: "session-client-email",
    title: "Client Email Draft",
    preview: "Help me write a professional email to follow up on a project proposal.",
    createdAt: "3 days ago",
    updatedAt: "3 days ago",
    messages: [
      {
        id: "msg-email-1",
        sender: "user",
        text: "Help me write a professional email to follow up on a project proposal.",
        timestamp: "3 days ago",
      },
      {
        id: "msg-email-2",
        sender: "assistant",
        text: "Here is a crisp, professional follow-up template:\n\n**Subject:** Follow-up: Project Proposal & Next Steps for [Project Name]\n\nHi [Client Name],\n\nI hope you're having a great week.\n\nI wanted to follow up on the proposal sent over last week for [Project Name]. We're excited about the prospect of collaborating and want to ensure you have all the information needed to evaluate the plan.\n\nPlease let me know if you have any questions or if you'd like to schedule a brief 10-minute check-in this week.\n\nBest regards,\n[Your Name]",
        timestamp: "3 days ago",
      },
    ],
  },
];

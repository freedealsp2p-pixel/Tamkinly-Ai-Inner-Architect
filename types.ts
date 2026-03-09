export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface ResearchPaper {
  title: string;
  authors: string;
  coreConcept: string;
  insight: string;
}

export enum AppView {
  CHAT = 'CHAT',
  RESOURCES = 'RESOURCES',
  GROUNDING = 'GROUNDING'
}

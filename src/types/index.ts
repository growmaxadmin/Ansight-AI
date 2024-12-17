export interface User {
  id: string;
  email: string;
  name: string;
  organizationId?: string;
  plan: "single" | "team" | "pro";
  tokenUsage: number;
}

export interface Organization {
  id: string;
  name: string;
  ownerId: string;
  tokenUsage: number;
  plan: "single" | "team" | "pro";
}

export interface Chat {
  id: string;
  organizationId: string;
  userId: string;
  messages: ChatMessage[];
  csvFile?: string;
  tokenUsage: number;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  tokenUsage: number;
  timestamp: Date;
}

export interface PlanDetails {
  name: "single" | "team" | "pro";
  price: number;
  tokenLimit: number;
  features: string[];
  maxOrganizations: number;
  maxMembers: number;
}
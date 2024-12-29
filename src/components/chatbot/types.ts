export interface Message {
  id: number;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface QuickReply {
  id: string;
  text: string;
  action: () => void;
}
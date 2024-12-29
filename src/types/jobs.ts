export interface JobRequest {
  id: number;
  client: {
    name: string;
    image: string;
  };
  service: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  date: string;
  time: string;
  location: string;
  description: string;
  budget: number;
  urgency: 'normal' | 'urgent';
  photos?: string[];
  evidence?: {
    before: string[];
    after: string[];
    description: string;
  };
}
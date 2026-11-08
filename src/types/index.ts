export interface Milestone {
  id: string;
  period: string;
  title: string;
  status: 'current' | 'upcoming' | 'long-term';
  description: string;
  goals: string[];
  icon: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  role: string;
  levelText: string;
  progress: number;
  description: string;
  topics: string[];
  recommendedTools: string[];
  starterTip: string;
}

export interface StudyItem {
  id: string;
  subject: string;
  target: string;
  type: 'math' | 'mongolian_script' | 'mongolian_language' | 'coding';
  status: 'planned' | 'in_progress' | 'completed';
  notes: string;
}

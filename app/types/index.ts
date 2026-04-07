export interface TimelineEvent {
  id: number;
  month: number;
  title: string;
  description: string;
  emoji: string;
  color: string;
}

export interface GameState {
  isPlaying: boolean;
  score: number;
  level: number;
  hearts: number;
}

export interface PasswordScreenProps {
  onPasswordCorrect: () => void;
}

export interface TimelineProps {
  events: TimelineEvent[];
}

export interface GameProps {
  onGameComplete: () => void;
}

export interface MessageScreenProps {
  onRestart: () => void;
}

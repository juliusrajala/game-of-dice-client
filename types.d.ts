declare namespace JSX {
  interface IntrinsicAttributes {
    cssProps?: any;
    isToggled?: boolean;
    onClick?: (any?) => void;
  }
}

// Technical specs

declare type HttpRequestStatus = '' | 'pending' | 'rejected' | 'fulfilled';

// Domain related types.

declare type DieType =
  | 'd2'
  | 'd3'
  | 'd4'
  | 'd6'
  | 'd8'
  | 'd10'
  | 'd12'
  | 'd20'
  | 'd100';

declare type EventType = 'dice_event' | 'hp_event' | 'dm_event';

declare interface Die {
  id: string;
  type: DieType;
  value: number | null;
}

declare interface User {
  user_email: string;
  user_name: string;
  user_id: string;
  color: string;
  is_admin: boolean;
}

declare interface DndEvent {
  event_type: EventType;
  event_id: string;
  creator: string;
  timestamp: number | string;
  description: string;
  accent_color?: string;
  player_name?: string;
}

declare interface DiceEvent extends DndEvent {
  event_type: 'dice_event';
  rolls: Die[];
  skill?: string;
}

declare interface HpEvent extends DndEvent {
  event_type: 'hp_event';
  target: string;
  value: number;
  type: 'spell' | 'elemental' | 'non-lethal' | 'trap';
}

declare interface Character {
  character_id: string;
  character_name: string;
  hit_points: number;
  armor_class: number;
  attack_bonus: number;
  damage_taken: number;
  owner_id: string;
  reflex: number;
  will: number;
  fortitude: number;
  player_name?: string;
  accent_color?: string;
}

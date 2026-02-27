// types/api.ts

// Enums
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type LabDifficulty = 'easy' | 'medium' | 'hard';
export type SectionType = 'theory' | 'task' | 'solution';
export type ValidationRuleType = 'command' | 'script' | 'http';

// Course Module
export interface CourseModule {
  id: number;
  title: string;
  order: number;
  course: string; // UUID
}

// Course
export interface Course {
  id: string; // UUID
  modules: CourseModule[];
  title: string;
  slug: string;
  description: string;
  level: CourseLevel;
  status: ContentStatus;
  created_at: string; // datetime
  updated_at: string; // datetime
  created_by: string | null; // UUID
  updated_by: string | null; // UUID
}

// Task Validation Rule
export interface TaskValidationRule {
  id: number;
  type: ValidationRuleType;
  config_json: Record<string, any>;
  timeout_seconds: number;
  task: number;
}

// Lab Task
export interface LabTask {
  id: number;
  validation_rules: TaskValidationRule[];
  title: string;
  prompt_md: string;
  order: number;
  is_required: boolean;
  max_attempts: number;
  lab: number;
  section: number | null;
}

// Lab Section
export interface LabSection {
  id: number;
  title: string;
  content_md: string;
  order: number;
  type: SectionType;
  lab: number;
}

// Lab
export interface Lab {
  id: number;
  sections: LabSection[];
  tasks: LabTask[];
  title: string;
  docker_image: string;
  difficulty: LabDifficulty;
  status: ContentStatus;
  time_limit_minutes: number;
  module: number;
  created_by: string | null; // UUID
  updated_by: string | null; // UUID
}

// Auth
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  refresh: string;
  access: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  password2: string;
}

export interface TokenRefreshRequest {
  refresh: string;
}

export interface TokenRefreshResponse {
  access: string;
  refresh: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
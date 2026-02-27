export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type LabDifficulty = 'easy' | 'medium' | 'hard';
export type SectionType = 'theory' | 'task' | 'solution';
export type ValidationRuleType = 'command' | 'script' | 'http';

export interface CourseModule {
  id: number;
  title: string;
  order: number;
  course: string;
}

export interface Course {
  id: string;
  modules: CourseModule[];
  title: string;
  slug: string;
  description: string;
  level: CourseLevel;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
}

export interface LabSection {
  id: number;
  title: string;
  content_md: string;
  order: number;
  type: SectionType;
  lab: number;
}

export interface TaskValidationRule {
  id: number;
  type: ValidationRuleType;
  config_json: Record<string, unknown>;
  timeout_seconds: number;
  task: number;
}

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
  created_by: string | null;
  updated_by: string | null;
}

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
}

export interface LabStartResponse {
  session_id?: string;
  id?: string;
  [key: string]: unknown;
}

export interface SessionData {
  id?: string;
  session_id?: string;
  status?: string;
  started_at?: string;
  expires_at?: string;
  [key: string]: unknown;
}

export type AdminCreateCourse = Pick<Course, 'title' | 'slug' | 'description' | 'level'> & Partial<Pick<Course, 'status'>>;
export type AdminCreateModule = Pick<CourseModule, 'title' | 'course'> & Partial<Pick<CourseModule, 'order'>>;
export type AdminCreateLab = Pick<Lab, 'title' | 'docker_image' | 'difficulty' | 'module'> & Partial<Pick<Lab, 'status' | 'time_limit_minutes'>>;
export type AdminCreateLabSection = Pick<LabSection, 'title' | 'content_md' | 'type' | 'lab'> & Partial<Pick<LabSection, 'order'>>;
export type AdminCreateLabTask = Pick<LabTask, 'title' | 'prompt_md' | 'lab'> & Partial<Pick<LabTask, 'order' | 'is_required' | 'max_attempts' | 'section'>>;
export type AdminCreateValidationRule = Pick<TaskValidationRule, 'task'> & Partial<Pick<TaskValidationRule, 'type' | 'config_json' | 'timeout_seconds'>>;

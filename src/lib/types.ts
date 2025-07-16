export interface Document {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  file_url: string;
  html_url?: string;
  html_content?: string;
  created_at: string;
}

export interface Lead {
  id: string;
  document_id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
} 
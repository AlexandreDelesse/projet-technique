export interface File {
  id: number;
  path: string;
  created_at: Date;
  updated_at: Date;
  type?: string;
  original_filename?: string;
  size?: number;
}

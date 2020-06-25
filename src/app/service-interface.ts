export interface projects {
  id?: number,
  title: string,
  description: string,
  created_at?: any,
  updated_at?: any,
  deleted_at?: any
}

export interface projectDetail {
  id?: number,
  project_id?: number,
  category: string,
  details: string,
  created_at?: string,
  updated_at?: string
}

export interface cms {
  id?: number,
  title: string,
  details: string,
  created_at?: string,
  updated_at?: string
}

export interface skill {
  id?: number,
  category: string,
  title: string,
  count: number,
  color: string,
  created_at?: string,
  updated_at?: string
}

export interface homeProject {
  title: string,
  description: string,
  created_at: any
  fronts: projectDetail[],
  backs: projectDetail[]
}

export interface log {
  id: number,
  ip: any,
  platform: string,
  browser: string,
  created_at?: string,
  updated_at?: string
}
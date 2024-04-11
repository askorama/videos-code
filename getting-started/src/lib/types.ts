export interface Game {
  total_rating?: string | number;
  id: number;
  cover: Cover;
  first_release_date: number;
  genres?: Genre[];
  involved_companies?: InvolvedCompany[];
  name: string;
  screenshots?: Screenshot[];
  slug: string;
  summary: string;
  url: string;
  videos?: Video[];
}

export interface Cover {
  id: number;
  game: number;
  height: number;
  image_id: string;
  url: string;
  width: number;
  checksum: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface InvolvedCompany {
  id: number;
  company: Company;
  created_at: number;
  developer: boolean;
  game: number;
  porting: boolean;
  publisher: boolean;
  supporting: boolean;
  updated_at: number;
  checksum: string;
}

export interface Company {
  id: number;
  name: string;
}

export interface Screenshot {
  id: number;
  alpha_channel?: boolean;
  animated?: boolean;
  game: number;
  height: number;
  image_id: string;
  url: string;
  width: number;
  checksum: string;
}

export interface Video {
  id: number;
  game: number;
  name: string;
  video_id: string;
  checksum: string;
}

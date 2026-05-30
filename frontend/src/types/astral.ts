export interface AstralMap {
  user: {
    username: string;
    avatar_url: string;
    analysis_date: string;
    lunar_cycle: string;
    cosmic_reach: string;
  };
  solar_sign: {
    title: string;
    description: string;
    tags: string[];
  };
  ascendant: {
    name: string;
    status: string;
    title: string;
    tags: string[];
    quote: string;
  };
  temporal_rhythm: {
    sync_rate: string;
    chart_data: {
      SEG: number;
      TER: number;
      QUA: number;
      QUI: number;
      SEX: number;
      SAB: number;
      DOM: number;
    };
  };
  babel_fish: {
    input_hash: string;
    input_message: string;
    haiku: string;
  };
  astrolabe: {
    orbital_cycles: string;
    zodiac_repos: number;
    collaboration_flow: string;
    constellation_phase: string;
  };
}

export interface ApiError {
  error: string;
}

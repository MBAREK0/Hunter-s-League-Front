
export interface Competition {
  id: string;
  code: string;
  location: string;
  date: string;
  speciesType: string;
  maxParticipants: number;
  minParticipants: number;
  openRegistration: boolean;
}

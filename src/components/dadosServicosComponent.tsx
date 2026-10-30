export type JobRequest = {
  id: string;
  service: string;
  city: string;
  startsAt: string; // ISO 8601
  durationMin: number;
  priceCents: number;
  urgent: boolean;
};

export const jobs: JobRequest[] = [
  {
    id: "1",
    service: "Canalização",
    city: "Porto",
    startsAt: "2026-11-12T10:00:00Z",
    durationMin: 60,
    priceCents: 4500,
    urgent: false,
  },
  {
    id: "2",
    service: "Eletricidade",
    city: "Lisboa",
    startsAt: "2026-11-12T14:30:00Z",
    durationMin: 90,
    priceCents: 7000,
    urgent: true,
  },
  {
    id: "3",
    service: "Pintura",
    city: "Braga",
    startsAt: "2026-11-13T09:00:00Z",
    durationMin: 240,
    priceCents: 18000,
    urgent: false,
  },
  {
    id: "4",
    service: "Pintura",
    city: "Coimbra",
    startsAt: "2026-11-14T08:30:00Z",
    durationMin: 180,
    priceCents: 12000,
    urgent: false,
  },
  {
    id: "5",
    service: "Canalização",
    city: "Lisboa",
    startsAt: "2026-11-14T16:00:00Z",
    durationMin: 45,
    priceCents: 3500,
    urgent: true,
  },
  {
    id: "6",
    service: "Eletricidade",
    city: "Porto",
    startsAt: "2026-11-15T11:00:00Z",
    durationMin: 120,
    priceCents: 9000,
    urgent: false,
  },
  // Adicionar mais serviços
];

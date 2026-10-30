import type { JobRequest } from "./dadosServicosComponent";

type Props = {
  job: JobRequest;
  onAccept: (id: string) => void;
};

type FormatPrice = (cents: number) => string;
type FormatDateTime = (iso: string) => string;
type FormatDuration = (totalMinutes: number) => string;

// 4500 -> "45,00 €"
const formatPrice: FormatPrice = (cents) => {
  const euros: number = cents / 100;
  return euros.toFixed(2).replace(".", ",") + " €";
};

// "2026-11-12T10:00:00Z" -> "12/11/2026 10:00"
const formatDateTime: FormatDateTime = (iso) => {
  const date: Date = new Date(iso);

  const day: string = String(date.getDate()).padStart(2, "0"); // padstart só trabalha em strings
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const year: number = date.getFullYear();
  const hours: string = String(date.getHours()).padStart(2, "0");
  const minutes: string = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

// 90 -> "1h30", 45 -> "45 min", 120 -> "2h"
const formatDuration: FormatDuration = (totalMinutes) => {
  const hours: number = Math.floor(totalMinutes / 60);
  const minutes: number = totalMinutes % 60;

  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h${String(minutes).padStart(2, "0")}`;
};

export default function InterfaceComponent({ job, onAccept }: Props) {
  return (
    <li className="job-card">
      <div className="job-header">
        <h2>{job.service}</h2>
        {job.urgent && <span className="badge">Urgente</span>}
      </div>
      <p>{job.city}</p>
      <p>{formatDateTime(job.startsAt)}</p>
      <p>Duração: {formatDuration(job.durationMin)}</p>
      <p className="price">{formatPrice(job.priceCents)}</p>
      <button type="button" onClick={() => onAccept(job.id)}>
        Aceitar
      </button>
    </li>
  );
}

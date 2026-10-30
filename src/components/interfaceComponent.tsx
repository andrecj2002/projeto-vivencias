import type { JSX } from "react";
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

export default function InterfaceComponent({
  job,
  onAccept,
}: Props): JSX.Element {
  return (
    <tr className="hover:bg-slate-50 text-sm text-slate-800">
      <td className="p-4 border-b border-slate-200">{job.service}</td>
      <td className="p-4 border-b border-slate-200">{job.city}</td>
      <td className="p-4 border-b border-slate-200">
        {formatDateTime(job.startsAt)}
      </td>
      <td className="p-4 border-b border-slate-200">
        {formatDuration(job.durationMin)}
      </td>
      <td className="p-4 border-b border-slate-200 font-semibold whitespace-nowrap">
        {formatPrice(job.priceCents)}
      </td>
      <td className="p-4 border-b border-slate-200">
        <span
          className={
            job.urgent
              ? "px-3 py-1 rounded-full text-xs bg-red-100 text-red-700"
              : "px-3 py-1 rounded-full text-xs bg-slate-100 text-slate-600"
          }
        >
          {job.urgent ? "Sim" : "Não"}
        </span>
      </td>
      <td className="p-4 border-b border-slate-200">
        <button
          type="button"
          onClick={() => onAccept(job.id)}
          className="px-4 py-1.5 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Aceitar
        </button>
      </td>
    </tr>
  );
}
import { useState } from "react";
import { jobs } from "./dadosServicosComponent";
import type { JobRequest } from "./dadosServicosComponent";
import InterfaceComponent from "./interfaceComponent";

export default function App() {
  // 1. TIPOS / ESTADO
  const [currentJobs, setCurrentJobs] = useState<JobRequest[]>(jobs);

  // 2. FUNÇÃO: remove da lista o pedido com o id recebido
  function accept(id: string): void {
    const newList: JobRequest[] = [];

    for (const job of currentJobs) {
      if (job.id !== id) {
        newList.push(job);
      }
    }

    setCurrentJobs(newList);
  }

  // 3. INTERFACE
  return (
    <main>
      <ul>
        {currentJobs.map((job) => (
          <InterfaceComponent key={job.id} job={job} onAccept={accept} />
        ))}
      </ul>
    </main>
  );
}
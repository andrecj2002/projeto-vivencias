import { useState } from "react";
import { jobs } from "./dadosServicosComponent";
import type { JobRequest } from "./dadosServicosComponent";
import InterfaceComponent from "./interfaceComponent";
import FiltrarComponent from "./filtrarComponent";

export default function App() {
  const [currentJobs, setCurrentJobs] = useState<JobRequest[]>(jobs);
  const [selectedCity, setSelectedCity] = useState<string>("");


  // Calculado a partir da lista original, por isso uma cidade não desaparece do filtro quando é aceite o último pedido dela.
  const cities: string[] = [];
for (const job of jobs) {
  if (!cities.includes(job.city)) {
    cities.push(job.city);
  }
}

  // Remove da lista o pedido com o id recebido
  function accept(id: string): void {
    const newList: JobRequest[] = [];

    for (const job of currentJobs) {
      if (job.id !== id) {
        newList.push(job);
      }
    }

    setCurrentJobs(newList);
  }

    const visibleJobs: JobRequest[] = [];
  for (const job of currentJobs) {
    if (selectedCity === "" || job.city === selectedCity) {
      visibleJobs.push(job);
    }
  }


  return (
    <main>
      <FiltrarComponent
        cities={cities}
        selectedCity={selectedCity}
        onChange={setSelectedCity}
      />
      <ul>
        {visibleJobs.map((job) => (
          <InterfaceComponent key={job.id} job={job} onAccept={accept} />
        ))}
      </ul>
    </main>
  );
}
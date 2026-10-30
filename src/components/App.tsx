import { useEffect, useState } from "react";
import { jobs } from "./dadosServicosComponent";
import type { JobRequest } from "./dadosServicosComponent";
import InterfaceComponent from "./interfaceComponent";
import FiltrarComponent from "./filtrarComponent";

export default function App() {
  const [currentJobs, setCurrentJobs] = useState<JobRequest[]>(jobs);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

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

  // Filtro para cidade selecionada
  const visibleJobs: JobRequest[] = [];
  for (const job of currentJobs) {
    if (selectedCity === "" || job.city === selectedCity) {
      visibleJobs.push(job);
    }
  }

  // Mensagem a mostrar quando não há pedidos visíveis
  let emptyMessage: string = "";
  if (currentJobs.length === 0) {
    emptyMessage = "Não há pedidos disponíveis.";
  } else if (visibleJobs.length === 0) {
    emptyMessage = "Não há pedidos em " + selectedCity + ".";
  }

  // Carregar
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <main>
        <p>A carregar...</p>
      </main>
    );
  }

  return (
    <main>
      <FiltrarComponent
        cities={cities}
        selectedCity={selectedCity}
        onChange={setSelectedCity}
      />
      {visibleJobs.length === 0 ? (
        <p>{emptyMessage}</p>
      ) : (
        <ul>
          {visibleJobs.map((job) => (
            <InterfaceComponent key={job.id} job={job} onAccept={accept} />
          ))}
        </ul>
      )}
    </main>
  );
}

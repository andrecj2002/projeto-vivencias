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
      <main className="min-h-screen w-full flex items-center justify-center bg-white">
        <p className="text-gray-600">A carregar...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex justify-center items-start bg-white px-8 py-12">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-10 min-h-[48rem]">
        <h1 className="text-3xl font-bold text-center mb-8">
          Pedidos de serviço
        </h1>

        <FiltrarComponent
          cities={cities}
          selectedCity={selectedCity}
          onChange={setSelectedCity}
        />

        {visibleJobs.length === 0 ? (
          <p className="text-center text-gray-500 py-10">{emptyMessage}</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md bg-white text-gray-700">
            <table className="w-full text-left table-auto min-w-max">
              <thead>
                <tr className="text-sm font-normal leading-none text-slate-500">
                  <th className="p-4 border-b border-slate-300 bg-slate-50 font-normal">Serviço</th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50 font-normal">Cidade</th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50 font-normal">Data e hora</th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50 font-normal">Duração</th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50 font-normal">Valor</th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50 font-normal">Urgente</th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50 font-normal">Ação</th>
                </tr>
              </thead>
              <tbody>
                {visibleJobs.map((job) => (
                  <InterfaceComponent key={job.id} job={job} onAccept={accept} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

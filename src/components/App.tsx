import { jobs } from "./dadosServicosComponent";
import InterfaceComponent from "./interfaceComponent";

export default function App() {
  return (
    <main>
      <ul>
        {jobs.map((j) => (
          <InterfaceComponent
            key={j.id}
            job={j}
            onAccept={(id) => console.log("Aceitar", id)}
          />
        ))}
      </ul>
    </main>
  );
}
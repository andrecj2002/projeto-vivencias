import type { ChangeEvent, JSX } from "react";

type Props = {
  cities: string[];
  selectedCity: string;
  onChange: (city: string) => void;
};

export default function FiltrarComponent({
  cities,
  selectedCity,
  onChange,
}: Props): JSX.Element {
  return (
    <div className="mb-6">
      <label htmlFor="city" className="mr-2 text-sm">
        Cidade:
      </label>
      <select
        id="city"
        value={selectedCity}
        onChange={(event: ChangeEvent<HTMLSelectElement>): void =>
          onChange(event.target.value)
        }
        className="border border-gray-300 rounded px-3 py-1.5 text-sm"
      >
        <option value="">Todas as cidades</option>
        {cities.map((city: string) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

interface Props {
  cities: string[];
  selectedCity: string;
  onChange: (city: string) => void;
}

export default function FiltrarComponent({ cities, selectedCity, onChange }: Props) {
  return (
    <div>
      <label htmlFor="city">Cidade: </label>
      <select
        id="city"
        value={selectedCity}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Todas as cidades</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}
import { useState } from "react";

interface TemperatureLogProps {
  onLogTemperature: (temperature: string) => void;
}
const TemperatureLog = ({ onLogTemperature }: TemperatureLogProps) => {
  const [temperature, setTemperature] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogTemperature(temperature);
    setTemperature("");
  };

  return (
    <div className="temperature-log">
      <h2>Temperature Log</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={temperature}
          onChange={e => setTemperature(e.target.value)}
          placeholder="Enter temperature (°C)"
        />
        <button type="submit">Log Temperature</button>
      </form>
    </div>
  );
};

export default TemperatureLog;

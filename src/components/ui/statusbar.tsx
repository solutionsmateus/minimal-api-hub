// src/components/StatusBar.jsx
import React, { useState } from "react";
import "./StatusBar.css"; // Opcional: Para estilização

const statusOptions = [
  { key: "cancelled", label: "Cancelado" },
  { key: "failed", label: "Falhou" },
  { key: "completed", label: "Concluído" },
];

function StatusBar() {
  const [currentStatus, setCurrentStatus] = useState(null);

  const handleStatusChange = (newStatusKey) => {
    setCurrentStatus(newStatusKey);
    console.log(`Novo Status Selecionado: ${newStatusKey}`);
    // **Aqui você adicionaria a lógica para atualizar o status no seu backend/global state**
  };

  return (
    <div className="status-bar-container">
      <h3>Selecione o Status:</h3>
      <div className="status-buttons">
        {statusOptions.map((option) => (
          <button
            key={option.key}
            className={`status-button ${
              currentStatus === option.key ? "active" : ""
            }`}
            onClick={() => handleStatusChange(option.key)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {currentStatus && (
        <p className="current-status-display">
          **Status Atual:** **
          {statusOptions.find((o) => o.key === currentStatus).label}**
        </p>
      )}
    </div>
  );
}

export default StatusBar;

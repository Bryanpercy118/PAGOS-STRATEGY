import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

interface PaymentResponse {
  ok: boolean;
  method?: string;
  message?: string;
}

function App() {
  const [amount, setAmount] = useState<number>(50000);
  const [method, setMethod] = useState<string>("");
  const [methods, setMethods] = useState<string[]>([]);
  const [resultNoStrategy, setResultNoStrategy] = useState<PaymentResponse | null>(null);
  const [resultStrategy, setResultStrategy] = useState<PaymentResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/payments/methods`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && Array.isArray(data.methods)) {
          setMethods(data.methods);
          setMethod(data.methods[0] || "");
        }
      })
      .catch(() => setMethods([]));
  }, []);

  const send = async (endpoint: string, setter: (data: PaymentResponse) => void) => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/payments/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, amount }),
      });
      const data = await res.json();
      setter(data);
    } catch (e: any) {
      setter({ ok: false, message: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-dark text-light d-flex flex-column align-items-center justify-content-start"
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
      }}
    >
      {/* HEADER */}
      <div className="w-100 py-4 bg-black bg-opacity-75 text-center border-bottom border-secondary">
        <h1 className="fw-bold text-warning display-5 m-0">
          Demostración del Patrón Strategy
        </h1>
        <p className="text-light-emphasis m-0">
          Comparando un sistema <strong>sin Strategy</strong> vs. <strong>con Strategy</strong>
        </p>
      </div>

      {/* BODY */}
      <div className="container-fluid flex-grow-1 py-5 px-5">
        <div className="row h-100">
          {/* PANEL IZQUIERDO */}
          <div className="col-md-4 bg-secondary bg-opacity-25 p-4 rounded-4 shadow-lg mb-4 mb-md-0">
            <h4 className="text-info mb-3 fw-semibold">Configuración del Pago</h4>
            <div className="mb-3">
              <label className="form-label">Método de pago</label>
              <select
                className="form-select bg-secondary text-light border-0"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                {methods.length > 0 ? (
                  methods.map((m) => (
                    <option key={m} value={m}>
                      {m.charAt(0).toUpperCase() + m.slice(1)}
                    </option>
                  ))
                ) : (
                  <option>Cargando...</option>
                )}
              </select>
            </div>
            <div className="mb-4">
              <label className="form-label">Monto</label>
              <input
                type="number"
                className="form-control bg-secondary text-light border-0"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min={1}
              />
            </div>
            <div className="d-grid gap-3">
              <button
                className="btn btn-danger py-3 fw-semibold fs-5"
                disabled={loading}
                onClick={() => send("process-no-strategy", setResultNoStrategy)}
              >
                 Ejecutar SIN Strategy
              </button>
              <button
                className="btn btn-success py-3 fw-semibold fs-5"
                disabled={loading}
                onClick={() => send("process", setResultStrategy)}
              >
                 Ejecutar CON Strategy
              </button>
            </div>
          </div>

          {/* PANEL DERECHO */}
          <div className="col-md-8 d-flex flex-column justify-content-between">
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="card bg-dark border-danger border-2 h-100">
                  <div className="card-body">
                    <h5 className="text-danger fw-bold">Sin usar Strategy</h5>
                    <p className="text-light-emphasis small">
                      Código rígido con múltiples condicionales. Cada nuevo método requiere
                      modificar el servicio principal.
                    </p>
                    <pre className="bg-black text-light p-3 rounded small overflow-auto">
                      {resultNoStrategy
                        ? JSON.stringify(resultNoStrategy, null, 2)
                        : "// Aún no se ha probado"}
                    </pre>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-dark border-success border-2 h-100">
                  <div className="card-body">
                    <h5 className="text-success fw-bold">Usando el patrón Strategy</h5>
                    <p className="text-light-emphasis small">
                      Cada algoritmo de pago está encapsulado. Puedes añadir uno nuevo sin tocar el
                      resto del sistema.
                    </p>
                    <pre className="bg-black text-light p-3 rounded small overflow-auto">
                      {resultStrategy
                        ? JSON.stringify(resultStrategy, null, 2)
                        : "// Aún no se ha probado"}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="text-center text-secondary small mt-3">
              Patrón <strong>Strategy</strong> aplicado a un sistema de pagos — Node.js + React              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

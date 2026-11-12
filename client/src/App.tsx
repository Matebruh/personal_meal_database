import { useEffect, useState } from 'react';

type HealthResponse = {
  status: string;
  message: string;
};

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function checkBackend() {
      try {
        const response = await fetch('/api/health', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Backend request failed');
        }

        const data: HealthResponse = await response.json();

        setMessage(data.message);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        setError('Could not connect to backend');
      }
    }

    checkBackend();

    return () => controller.abort();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-bold">
          Meal Organiser
        </h1>

        {message && (
          <p className="text-green-600">{message}</p>
        )}

        {error && (
          <p className="text-red-600">{error}</p>
        )}

        {!message && !error && (
          <p>Connecting to backend...</p>
        )}
      </div>
    </main>
  );
}

export default App;

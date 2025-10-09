'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Site {
  site_id: string;
  site_name: string;
}

interface Deviation {
  hour: number;
  forecast: number;
  actual: number;
  deviation_percent: number;
}

export default function Dashboard() {
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState('');
  const [date, setDate] = useState('2024-01-01');
  const [deviations, setDeviations] = useState<Deviation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
      return;
    }

    fetch('/api/sites')
      .then((res) => res.json())
      .then((data) => setSites(data.sites || []))
      .catch(() => setError('Failed to load sites'));
  }, [router]);

  const loadDeviations = async () => {
    if (!selectedSite) {
      setError('Please select a site');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/deviations?siteId=${selectedSite}&date=${date}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDeviations(data.deviations || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const chartData = deviations.map((d) => ({
    hour: d.hour,
    deviation: d.deviation_percent,
  }));

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">DSM Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Site</label>
              <select
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              >
                <option value="">Choose a site...</option>
                {sites.map((site) => (
                  <option key={site.site_id} value={site.site_id}>
                    {site.site_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={loadDeviations}
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 rounded disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load Deviations'}
              </button>
            </div>
          </div>
        </div>

        {deviations.length > 0 && (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Deviations Report - {date}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-3 text-gray-300">Hour</th>
                      <th className="text-right p-3 text-gray-300">Forecast (kWh)</th>
                      <th className="text-right p-3 text-gray-300">Actual (kWh)</th>
                      <th className="text-right p-3 text-gray-300">Deviation %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deviations.map((dev, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-gray-700 ${
                          dev.deviation_percent > 0 ? 'bg-green-900/20' : 'bg-red-900/20'
                        }`}
                      >
                        <td className="p-3 text-white">{dev.hour}:00</td>
                        <td className="p-3 text-right text-white">{dev.forecast.toFixed(2)}</td>
                        <td className="p-3 text-right text-white">{dev.actual.toFixed(2)}</td>
                        <td className={`p-3 text-right font-bold ${dev.deviation_percent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {dev.deviation_percent.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Deviation Analysis Chart</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="deviation" fill="#fbbf24" name="Deviation %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

    {error && (
      <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4">
        {error}
      </div>
    )}

    <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Site
          </label>
          <select
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            disabled={loadingSites}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="">
              {loadingSites ? 'Loading sites...' : 'Choose a site...'}
            </option>
            {sites.map((site) => (
              <option key={site.site_id} value={site.site_id}>
                {site.site_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleLoadDeviations}
            disabled={loadingDeviations || loadingSites || !selectedSite}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 rounded disabled:opacity-50"
          >
            {loadingDeviations ? 'Loading...' : 'Load Deviations'}
          </button>
        </div>
      </div>
    </div>

    {deviations.length > 0 && (
      <div className="space-y-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            Deviations Report - {date}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-3 text-gray-300">Hour</th>
                  <th className="text-right p-3 text-gray-300">
                    Forecast (kWh)
                  </th>
                  <th className="text-right p-3 text-gray-300">
                    Actual (kWh)
                  </th>
                  <th className="text-right p-3 text-gray-300">
                    Deviation %
                  </th>
                </tr>
              </thead>
              <tbody>
                {deviations.map((dev, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-700 ${
                      dev.deviation_percent >= 0
                        ? 'bg-green-900/20'
                        : 'bg-red-900/20'
                    }`}
                  >
                    <td className="p-3 text-white">{dev.hour}:00</td>
                    <td className="p-3 text-right text-white">
                      {dev.forecast.toFixed(2)}
                    </td>
                    <td className="p-3 text-right text-white">
                      {dev.actual.toFixed(2)}
                    </td>
                    <td
                      className={`p-3 text-right font-bold ${
                        dev.deviation_percent >= 0
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {dev.deviation_percent.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">
            Deviation Analysis Chart
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                }}
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

export  const EditableTable = ({ data, onChange }) => (
    <table className="w-full border">
      <thead>
        <tr>
          {Object.keys(data[0] || {}).map((key) => (
            <th key={key} className="border p-2 text-left">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b">
            {Object.entries(row).map(([key, cell], cellIndex) => (
              <td key={cellIndex} className="border p-2 dark:text-gray-900">
                <input
                  value={cell as string}
                  onChange={(e) => onChange(rowIndex, key, e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
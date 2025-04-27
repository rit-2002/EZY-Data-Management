import { TableHeader } from './TableHeader';

interface ResponsiveTableProps {
  data: any[];
  sortConfig: any;
  onSort: (key: any) => void; 
}

export const ResponsiveTable = ({ data, sortConfig = { key: null, direction: 'ascending' } }) => (
    <table className="w-full border ">
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
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex} className="border p-2">
                {cell as string}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
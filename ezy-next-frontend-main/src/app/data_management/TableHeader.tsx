import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

interface TableHeaderProps {
  column: string;
  sortConfig: {
    key: string | null;
    direction: string;
  };
  onSort: (key: string) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ column, sortConfig, onSort }) => {
  const getSortIcon = () => {
    if (sortConfig.key !== column) {
      return <FaSort className="inline-block ml-1" />;
    }
    return sortConfig.direction === 'ascending' ? 
      <FaSortUp className="inline-block ml-1" /> : 
      <FaSortDown className="inline-block ml-1" />;
  };

  return (
    <th 
      key={column} 
      className="border p-2 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={() => onSort(column)}
    >
      <div className="flex items-center justify-between">
        <span>{column}</span>
        {getSortIcon()}
      </div>
    </th>
  );
};
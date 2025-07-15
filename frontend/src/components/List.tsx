import EmptyData from "./EmptyData";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./table";

export interface TableColumn {
  key: string;
  title: string;
  titleCenter?: boolean;
  className?: string;
  render?: (
    value: any,
    record: any,
    indx: number,
    rowIndx: number
  ) => React.ReactNode;
}

export interface ListProps<T> {
  data?: T[];
  columns: TableColumn[];
  className?: string;
  titleCenter?: boolean;
  loading?: boolean;
  bodyClassName?: string;
  onRowClick?: (value?: any) => void;
}

export default function List<T>({
  data,
  columns,
  className = "",
  titleCenter,
  loading = false,
  bodyClassName = "",
  onRowClick,
}: ListProps<T>) {
  return (
    <div
      className={`overflow-hidden relative w-full border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${
        className || ""
      }`}
    >
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[rgba(0,0,0,0.1)] cursor-not-allowed">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      <div className={`max-h-[50vh] overflow-auto ${bodyClassName}`}>
        <Table className="border-collapse w-full relative">
          <TableHeader>
            <TableRow className="bg-[#4F81BD] text-white sticky top-0 z-10">
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  isHeader
                  className={`p-4 text-left font-medium ${
                    titleCenter ? "!text-center" : ""
                  } ${
                    index !== columns?.length - 1
                      ? "border-r border-r-white"
                      : ""
                  }`}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {!data || data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-6 text-center"
                >
                  <EmptyData />
                </TableCell>
              </TableRow>
            ) : (
              data.map((record: any, index) => (
                <TableRow
                  key={index}
                  className="bg-[#D0D8E8] transition-colors"
                  onClick={() => onRowClick && onRowClick(record)}
                >
                  {columns.map((column, columnIndex) => (
                    <TableCell
                      key={columnIndex}
                      className={`px-4 py-2 border-t-1 border-t-white ${
                        index % 2 === 0 ? "!bg-[#D0D8E8]" : "!bg-[#E9EDF4]"
                      } ${
                        columnIndex !== columns.length - 1 &&
                        `border-r border-r-white border-r-solid`
                      } ${column?.className && column?.className}`}
                    >
                      {column.render
                        ? column.render(
                            record[column.key as keyof T],
                            record,
                            columnIndex,
                            index
                          )
                        : (record[column.key as keyof T] as any)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

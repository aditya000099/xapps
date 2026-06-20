import { forwardRef, createContext, useContext } from 'react';

/** @type {React.Context<{ striped: boolean }>} */
const TableContext = createContext({ striped: false });

/**
 * Responsive data table wrapper.
 *
 * @param {object} props
 * @param {boolean} [props.striped=false]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
const Table = forwardRef(function Table(
  { striped = false, className = '', children, ...rest },
  ref
) {
  return (
    <TableContext.Provider value={{ striped }}>
      <div className="w-full overflow-x-auto">
        <table
          ref={ref}
          className={[
            'w-full caption-bottom text-sm border-collapse',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...rest}
        >
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
});

/**
 * Table header (`<thead>`).
 */
const TableHeader = forwardRef(function TableHeader(
  { className = '', children, ...rest },
  ref
) {
  return (
    <thead
      ref={ref}
      className={['bg-card', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </thead>
  );
});

/**
 * Table body (`<tbody>`).
 */
const TableBody = forwardRef(function TableBody(
  { className = '', children, ...rest },
  ref
) {
  return (
    <tbody
      ref={ref}
      className={className || undefined}
      {...rest}
    >
      {children}
    </tbody>
  );
});

/**
 * Table row (`<tr>`).
 */
const TableRow = forwardRef(function TableRow(
  { className = '', children, ...rest },
  ref
) {
  const { striped } = useContext(TableContext);

  return (
    <tr
      ref={ref}
      className={[
        'border-b border-border transition-colors',
        'hover:bg-muted/50',
        striped ? 'even:bg-muted/30' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </tr>
  );
});

/**
 * Table heading cell (`<th>`).
 */
const TableHead = forwardRef(function TableHead(
  { className = '', children, ...rest },
  ref
) {
  return (
    <th
      ref={ref}
      className={[
        'px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </th>
  );
});

/**
 * Table data cell (`<td>`).
 */
const TableCell = forwardRef(function TableCell(
  { className = '', children, ...rest },
  ref
) {
  return (
    <td
      ref={ref}
      className={['px-4 py-3 text-foreground', className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </td>
  );
});

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };

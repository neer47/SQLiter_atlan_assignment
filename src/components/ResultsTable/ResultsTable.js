import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Select,
  MenuItem,
  Button,
  Pagination,
  Box
} from "@mui/material";
import { ArrowDownward, ArrowUpward, FilterList, Download } from "@mui/icons-material";

function ResultsTable({
  isExecuting,
  columns,
  data,
  currentPage,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  totalRows,
  onExportResults,
}) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  const updateFilter = (columnId, value) => {
    setFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }));
    onChangePage(1);
  };

  const formattedData = useMemo(() => {
    if (!data || !data.rows || !Array.isArray(data.rows)) {
      return [];
    }
    // Use the rows directly since they are already in the correct format
    return data.rows;
  }, [data]);

  const filteredAndSortedData = useMemo(() => {
    let result = [...formattedData];

    Object.entries(filters).forEach(([columnId, filterValue]) => {
      if (filterValue.trim()) {
        result = result.filter((row) =>
          String(row[columnId] ?? "").toLowerCase().includes(filterValue.toLowerCase())
        );
      }
    });

    if (sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
        }

        const aString = String(aValue ?? "").toLowerCase();
        const bString = String(bValue ?? "").toLowerCase();

        return sortConfig.direction === "asc"
          ? aString.localeCompare(bString)
          : bString.localeCompare(aString);
      });
    }

    return result;
  }, [formattedData, filters, sortConfig]);

  const totalFilteredRows = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalFilteredRows / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalFilteredRows);
  const visibleData = filteredAndSortedData.slice(startIndex, endIndex);

  const resetFiltersAndSort = () => {
    setFilters({});
    setSortConfig({ key: null, direction: null });
    onChangePage(1);
  };

  return (
    <Card sx={{ mt: 4, bgcolor: 'background.paper', boxShadow: 1, height: '100%' }}>
      <CardHeader
        title="Results"
        titleTypographyProps={{ color: 'text.primary' }}
        action={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setShowFilters(!showFilters)}
              startIcon={<FilterList />}
              sx={{
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'secondary.main',
                },
              }}
            >
              Filter
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Download />}
              onClick={onExportResults}
              sx={{
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'secondary.main',
                },
              }}
            >
              Export
            </Button>
          </Box>
        }
      />
      <CardContent sx={{ height: 'calc(100% - 112px)', overflow: 'hidden' }}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            overflowX: 'auto',
            overflowY: 'auto',
            minHeight: '150px',
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} sx={{ bgcolor: 'secondary.main', color: 'text.primary' }}>
                    <TableSortLabel
                      active={sortConfig.key === column.id}
                      direction={sortConfig.direction || "asc"}
                      onClick={() => column.sortable && requestSort(column.id)}
                      IconComponent={
                        sortConfig.direction === "asc" ? ArrowUpward : ArrowDownward
                      }
                      sx={{ color: 'text.primary', '&:hover': { color: 'primary.main' } }}
                    >
                      {column.name}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
              {showFilters && (
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={`filter-${column.id}`}>
                      <TextField
                        variant="outlined"
                        size="small"
                        placeholder={`Filter ${column.name}`}
                        value={filters[column.id] || ""}
                        onChange={(e) => updateFilter(column.id, e.target.value)}
                        fullWidth
                        sx={{
                          bgcolor: 'background.paper',
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'divider',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                            },
                          },
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {isExecuting ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ color: 'text.secondary' }}>
                    Loading...
                  </TableCell>
                </TableRow>
              ) : visibleData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ color: 'text.secondary' }}>
                    {Object.keys(filters).length > 0
                      ? "No results match your filters"
                      : "No results found"}
                  </TableCell>
                </TableRow>
              ) : (
                visibleData.map((row, rowIndex) => (
                  <TableRow key={`row-${rowIndex}`} hover sx={{ '&:hover': { bgcolor: 'secondary.main' } }}>
                    {columns.map((column) => (
                      <TableCell key={`cell-${rowIndex}-${column.id}`} sx={{ color: 'text.primary' }}>
                        {row[column.id] === null || row[column.id] === undefined
                          ? "-"
                          : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Rows per page:
          </Typography>
          <Select
            value={rowsPerPage.toString()}
            onChange={(e) => onChangeRowsPerPage({ target: { value: e.target.value } })}
            size="small"
            sx={{
              bgcolor: 'background.paper',
              color: 'text.primary',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            }}
          >
            {[5, 10, 25, 50, 100].map((number) => (
              <MenuItem key={number} value={number.toString()}>
                {number}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {startIndex + 1}-{endIndex} of {totalFilteredRows}
          </Typography>
          {Object.keys(filters).length > 0 && (
            <Button
              variant="text"
              size="small"
              onClick={resetFiltersAndSort}
              sx={{
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'secondary.main',
                },
              }}
            >
              Clear Filters
            </Button>
          )}
        </Box>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => onChangePage(page)}
          size="small"
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'secondary.main',
              },
            },
            '& .Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: '#5E8D90',
              },
            },
          }}
        />
      </CardActions>
    </Card>
  );
}

export default ResultsTable;
import React, { useState } from 'react';
import { Box, Drawer} from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import QueryEditor from '../components/QueryEditor/QueryEditor';
import ResultsTable from '../components/ResultsTable/ResultsTable';
import mockData from '../data/mockData';

const drawerWidth = 240;

function SqlEditor() {
  const [query, setQuery] = useState('');
  const [selectedQuery, setSelectedQuery] = useState(0);
  const [queryHistory, setQueryHistory] = useState([]);
  const [results, setResults] = useState({ columns: [], rows: [] });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleQuerySelect = (index, source) => {
    if (source === 'available') {
      setSelectedQuery(index);
      setQuery(mockData[index].query);
      setResults({ columns: [], rows: [] });
    } else if (source === 'history') {
      setQuery(queryHistory[index].query);
      setResults(queryHistory[index].results);
    }
  };

  const handleRunQuery = () => {
    setLoading(true);
    setTimeout(() => {
      const selectedMock = mockData.find(item => item.query === query);
      let queryResult;
      if (selectedMock) {
        queryResult = selectedMock.result;
      } else {
        queryResult = [
          { message: "Custom query executed", query: query }
        ];
      }

      const columns = queryResult.length > 0 ? Object.keys(queryResult[0]).map(key => ({
        id: key,
        name: key.replace(/_/g, ' ').toUpperCase(),
        sortable: true,
      })) : [];
      const rows = queryResult.map((row, index) => ({ id: index, ...row }));

      setResults({ columns, rows });

      if (!queryHistory.some(item => item.query === query)) {
        setQueryHistory(prev => [{ query, results: { columns, rows } }, ...prev].slice(0, 5));
      }

      setLoading(false);
    }, 1000);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleExportResults = () => {
    const csvContent = [
      results.columns.map(col => col.name).join(','),
      ...results.rows.map(row => results.columns.map(col => row[col.id]).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'query_results.csv';
    link.click();
  };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Root Layout */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          minHeight: '100vh',
          pt: 8,
        }}
      >
        {/* Permanent Drawer for Larger Screens */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
              width: drawerWidth, 
              boxSizing: 'border-box',
              mt: 8,
              bgcolor: 'background.paper',  
              borderRight: 1,
              borderColor: 'divider',
            },
            display: { xs: 'none', sm: 'none', md: 'block' },
          }}
        >
          <Sidebar onQuerySelect={handleQuerySelect} availableQueries={mockData} queryHistory={queryHistory} />
        </Drawer>

        {/* Sidebar for Small Screens */}
        <Box
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            width: '100%', // Ensure full width on small screens
            p: 2,
            bgcolor: 'background.paper',
            borderBottom: { xs: 1, sm: 1, md: 0 },
            borderColor: 'divider',
          }}
        >
          <Sidebar onQuerySelect={handleQuerySelect} availableQueries={mockData} queryHistory={queryHistory} />
        </Box>

        {/* Main Content (QueryEditor and ResultsTable) */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` }, // Full width on small screens
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'calc(100vh - 64px)',
            bgcolor: 'background.default',
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              mb: 2,
              minHeight: '200px',
              maxHeight: { xs: '300px', md: '50%' },
            }}
          >
            <QueryEditor
              query={query}
              setQuery={setQuery}
              mockData={mockData}
              selectedQuery={selectedQuery}
              setSelectedQuery={setSelectedQuery}
              handleRunQuery={handleRunQuery}
              loading={loading}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              minHeight: '200px',
              maxHeight: { xs: '300px', md: '50%' },
            }}
          >
            <ResultsTable
              isExecuting={loading}
              columns={results.columns}
              data={results}
              currentPage={currentPage + 1}
              rowsPerPage={rowsPerPage}
              onChangePage={(page) => handleChangePage(null, page - 1)}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              totalRows={results.rows.length}
              onExportResults={handleExportResults}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SqlEditor;
import React from 'react';
import { Box, Button, MenuItem, Select } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { autocompletion } from '@codemirror/autocomplete';

function QueryEditor({ query, setQuery, mockData, selectedQuery, setSelectedQuery, handleRunQuery, loading }) {
  const editorStyles = EditorView.theme({
    '&': {
      backgroundColor: '#31363F',
      color: '#EEEEEE',
      border: '1px solid #76ABAE',
      borderRadius: '6px',
      height: '100%',
    },
    '.cm-scroller': {
      overflow: 'auto',
      minHeight: '100px',
      maxHeight: '300px',
    },
    '.cm-content': {
      fontFamily: 'monospace',
    },
    '.cm-gutters': {
      backgroundColor: '#31363F',
      color: '#76ABAE',
      borderRight: '1px solid #76ABAE',
    },
    '.cm-activeLine': {
      backgroundColor: '#31363F',
    },
    '.cm-selectionMatch': {
      backgroundColor: '#31363F',
    },
  });

  return (
    <Box sx={{ mb: 3, height: '100%' }}>
      <Select
        value={selectedQuery}
        onChange={(e) => {
          setSelectedQuery(e.target.value);
          setQuery(mockData[e.target.value].query);
        }}
        variant="outlined"
        fullWidth
        sx={{
          mb: 1,
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
        {mockData.map((item, index) => (
          <MenuItem key={index} value={index}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      <Box
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: theme => theme.shape.borderRadius,
          minHeight: '100px',
          maxHeight: '300px',
          overflowY: 'auto',
          bgcolor: 'background.paper',
        }}
      >
        <CodeMirror
          value={query}
          onChange={(value) => setQuery(value)}
          extensions={[sql(), autocompletion(), editorStyles]}
          theme={oneDark}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: true,
            bracketMatching: true,
            autocompletion: true,
          }}
          style={{
            height: '100%',
          }}
          aria-label="code-editor"
        />
      </Box>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                bgcolor: '#5E8D90',
              },
              '&:disabled': {
                bgcolor: 'secondary.main',
                color: 'text.secondary',
              },
            }}
            onClick={handleRunQuery}
            disabled={loading}
          >
            {loading ? 'Running...' : 'Run Query'}
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: 'divider',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'secondary.main',
              },
            }}
          >
            Save
          </Button>
        </Box>
        <Box
          component="p"
          sx={{
            fontSize: '0.8rem',
            color: 'text.secondary',
            m: 0,
          }}
        >
          <strong>NOTE: </strong>Click on a Previously Saved Query to Begin.
        </Box>
      </Box>
    </Box>
  );
}

export default QueryEditor;
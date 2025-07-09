import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Button,
  CircularProgress,
  IconButton,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useComments } from '../hooks/useComments';
import { getNextSortDirection } from '../utils/dataUtils';
import { SwiftLogo } from '../assets/SwiftLogo';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
    comments,
    loading,
    error,
    sort,
    setSort,
    filter,
    setFilter,
    pagination,
    setPagination,
    totalFilteredItems
  } = useComments();

  const handleSort = (field: 'postId' | 'name' | 'email') => {
    setSort(prev => ({
      field,
      direction: getNextSortDirection(prev.field === field ? prev.direction : null)
    }));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(prev => ({ ...prev, search: event.target.value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    setPagination(prev => ({
      ...prev,
      pageSize: event.target.value as number,
      currentPage: 1
    }));
  };

  const totalPages = Math.ceil(totalFilteredItems / pagination.pageSize);

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  const getSortIcon = (field: 'postId' | 'name' | 'email') => {
    if (sort.field !== field) return null;
    return sort.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const processedComments = comments.map(comment => ({
    ...comment,
    postId: comment.id + 12345677 // Adjusting postId to start from 12345678
  }));

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <SwiftLogo />
        <IconButton onClick={() => navigate('/profile')} color="primary" size="large">
          <AccountCircleIcon />
        </IconButton>
      </Box>

      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            component="span"
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            onClick={() => handleSort('postId')}
          >
            Sort Post ID {getSortIcon('postId')}
          </Box>
          <Box
            component="span"
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            onClick={() => handleSort('name')}
          >
            Sort Name {getSortIcon('name')}
          </Box>
          <Box
            component="span"
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            onClick={() => handleSort('email')}
          >
            Sort Email {getSortIcon('email')}
          </Box>
        </Stack>

        <Box display="flex" gap={2} alignItems="center">
          <TextField
            label="Search"
            variant="outlined"
            value={filter.search}
            onChange={handleSearch}
            size="small"
            sx={{ minWidth: 200 }}
          />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Page Size</InputLabel>
            <Select
              value={pagination.pageSize}
              label="Page Size"
              onChange={handlePageSizeChange}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Post ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processedComments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.postId}</TableCell>
                <TableCell>{comment.name}</TableCell>
                <TableCell>{comment.email}</TableCell>
                <TableCell>{comment.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2} display="flex" justifyContent="center" alignItems="center" gap={1}>
        <Button
          disabled={pagination.currentPage === 1}
          onClick={() => handlePageChange(pagination.currentPage - 1)}
        >
          Previous
        </Button>
        <Typography>
          Page {pagination.currentPage} of {totalPages}
        </Typography>
        <Button
          disabled={pagination.currentPage === totalPages}
          onClick={() => handlePageChange(pagination.currentPage + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
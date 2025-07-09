import { Comment, SortConfig, FilterConfig, PaginationConfig } from '../types';

export const filterComments = (comments: Comment[], filter: FilterConfig): Comment[] => {
  if (!filter.search) return comments;
  
  const searchLower = filter.search.toLowerCase();
  return comments.filter(comment => {
    return filter.searchFields.some(field => {
      const value = comment[field]?.toString().toLowerCase() || '';
      return value.includes(searchLower);
    });
  });
};

export const sortComments = (comments: Comment[], sort: SortConfig): Comment[] => {
  if (!sort.field || !sort.direction) return comments;

  return [...comments].sort((a, b) => {
    const aValue = a[sort.field!];
    const bValue = b[sort.field!];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sort.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    const aString = String(aValue).toLowerCase();
    const bString = String(bValue).toLowerCase();

    return sort.direction === 'asc'
      ? aString.localeCompare(bString)
      : bString.localeCompare(aString);
  });
};

export const paginateComments = (
  comments: Comment[],
  pagination: PaginationConfig
): Comment[] => {
  const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
  return comments.slice(startIndex, startIndex + pagination.pageSize);
};

export const getNextSortDirection = (current: 'asc' | 'desc' | null): 'asc' | 'desc' | null => {
  if (current === null) return 'asc';
  if (current === 'asc') return 'desc';
  return null;
};

export const persistFilters = (key: string, data: any): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getPersistedFilters = (key: string): any => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Comment, SortConfig, FilterConfig, PaginationConfig } from '../types';
import { filterComments, sortComments, paginateComments, getPersistedFilters, persistFilters } from '../utils/dataUtils';

const STORAGE_KEY = 'commentsConfig';

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sort, setSort] = useState<SortConfig>(
    getPersistedFilters(STORAGE_KEY)?.sort || {
      field: null,
      direction: null
    }
  );

  const [filter, setFilter] = useState<FilterConfig>(
    getPersistedFilters(STORAGE_KEY)?.filter || {
      search: '',
      searchFields: ['name', 'email', 'body']
    }
  );

  const [pagination, setPagination] = useState<PaginationConfig>(
    getPersistedFilters(STORAGE_KEY)?.pagination || {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0
    }
  );

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        // Remove duplicates based on email and name combination
        const uniqueComments = response.data.reduce((acc: Comment[], current: Comment) => {
          const isDuplicate = acc.some(item => 
            item.email === current.email && item.name === current.name
          );
          if (!isDuplicate) {
            acc.push(current);
          }
          return acc;
        }, []);

        setComments(uniqueComments);
        setPagination(prev => ({ ...prev, totalItems: uniqueComments.length }));
        setError(null);
      } catch (err) {
        setError('Failed to fetch comments');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  useEffect(() => {
    persistFilters(STORAGE_KEY, { sort, filter, pagination });
  }, [sort, filter, pagination]);

  const filteredComments = useMemo(() => {
    return filterComments(comments, filter);
  }, [comments, filter]);

  const sortedComments = useMemo(() => {
    return sortComments(filteredComments, sort);
  }, [filteredComments, sort]);

  const paginatedComments = useMemo(() => {
    return paginateComments(sortedComments, pagination);
  }, [sortedComments, pagination]);

  const totalFilteredItems = filteredComments.length;

  return {
    comments: paginatedComments,
    loading,
    error,
    sort,
    setSort,
    filter,
    setFilter,
    pagination,
    setPagination,
    totalFilteredItems
  };
};
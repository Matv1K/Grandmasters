import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchGrandmasters } from '../utils/api';
import { UI_CONFIG } from '../constants';

export const useGrandmasters = (limit = UI_CONFIG.INFINITE_SCROLL_LIMIT) => {
  return useInfiniteQuery({
    queryKey: ['grandmasters', 'infinite', limit],
    queryFn: ({ pageParam = 0 }) => fetchGrandmasters(pageParam, limit),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined;
      return allPages.length * limit;
    },
    retry: 2,
    refetchOnWindowFocus: false,
  });
}; 
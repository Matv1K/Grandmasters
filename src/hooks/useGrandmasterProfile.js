import { useQuery } from '@tanstack/react-query';
import { fetchPlayerProfile } from '../utils/api';


export const useGrandmasterProfile = (username) => {
  return useQuery({
    queryKey: ['grandmasterProfile', username],
    queryFn: () => fetchPlayerProfile(username),
    enabled: !!username,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}; 
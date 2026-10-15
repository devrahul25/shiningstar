import { QueryClient } from '@tanstack/react-query';


export const queryClientInstance = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true,
			staleTime: 1000 * 5, // Data stays fresh for 5 seconds, then re-checks automatically
			retry: 1,
		},
	},
});
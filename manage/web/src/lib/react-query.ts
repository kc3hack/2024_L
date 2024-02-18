import {DefaultOptions, QueryClient, UseMutationOptions, UseQueryOptions} from "react-query";
import { PromiseValue  } from "type-fest";
import {AxiosError} from "axios";

const queryConfig: DefaultOptions = {
    queries: {
        useErrorBoundary: true,
        refetchOnWindowFocus: false,
        retry: false,
    },
}

export const queryClient = new QueryClient({defaultOptions: queryConfig});

export type ExtractFnReturnType<FnType extends (...any: any) => any> = PromiseValue<ReturnType<FnType>>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
    UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
    'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    AxiosError,
    Parameters<MutationFnType>[0]
>

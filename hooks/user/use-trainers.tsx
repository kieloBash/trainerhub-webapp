"use client";

import { FETCH_INTERVAL } from "@/lib/utils";
import { USER_ROUTES } from "@/routes/user.routes";
import { UserType } from "@/types/lib.type";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const ROUTE = USER_ROUTES.TRAINERS.FETCH_ALL.URL;
const KEY = USER_ROUTES.TRAINERS.FETCH_ALL.KEY;
const INTERVAL = FETCH_INTERVAL

const default_limit = 10;
const default_filter = "ALL";

export type ApiResponse = {
    payload: UserType[],
    totalData: number,
    totalPages: number,
    currentPage: number,
};

export type FetchParams = {
    page?: number;
    limit?: number;
    filter?: string;
    searchTerm?: string;

    role?: string,
    sport?: string,

};

const fetchData = async ({
    page = 1,
    limit = default_limit,
    filter = default_filter,
    role = default_filter,
    sport = default_filter,
    searchTerm = "",
}: FetchParams): Promise<ApiResponse> => {
    const response = await fetch(
        `${ROUTE}?page=${page}&limit=${limit}&filter=${filter}&searchTerm=${searchTerm}&role=${role}&sport=${sport}`
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

interface IProps {
    page?: number,
    limit?: number,
    filter?: string,
    searchTerm?: string,
    role?: string,
    sport?: string,

    select?: any
}

const useUserTrainers = (
    {
        page = 1,
        limit = default_limit,
        filter = default_filter,
        role = default_filter,
        sport = default_filter,
        searchTerm = "",
        select,
    }: IProps
) => {

    const { data, error, isLoading, isFetching, isError } = useQuery<ApiResponse>({
        queryKey: [KEY, page, limit, filter, searchTerm, role, sport],
        queryFn: () =>
            fetchData({ page, limit, filter, searchTerm, role, sport }),
        staleTime: INTERVAL,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
        select
    });

    return {
        ...data,
        error,
        isLoading,
        isFetching,
        isError,
    };
};

export default useUserTrainers;
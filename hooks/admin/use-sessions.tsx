"use client";

import { FETCH_INTERVAL, FORMAT } from "@/lib/utils";
import { ADMIN_ROUTES } from "@/routes/admin.routes";
import { SessionType } from "@/types/lib.type";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { formatDate, subDays } from "date-fns";

const ROUTE = ADMIN_ROUTES.SESSIONS.FETCH_ALL.URL;
const KEY = ADMIN_ROUTES.SESSIONS.FETCH_ALL.KEY;
const INTERVAL = FETCH_INTERVAL

const default_limit = 10;
const default_filter = "ALL";
const default_startDate = subDays(new Date(), 7);
const default_endDate = new Date();

export type ApiResponse = {
    payload: SessionType[],
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
    startDate?: Date,
    endDate?: Date,
};

const fetchData = async ({
    page = 1,
    limit = default_limit,
    filter = default_filter,
    role = default_filter,
    sport = default_filter,
    startDate = default_startDate,
    endDate = default_endDate,
    searchTerm = "",
}: FetchParams): Promise<ApiResponse> => {
    const response = await fetch(
        `${ROUTE}?page=${page}&limit=${limit}&filter=${filter}&searchTerm=${searchTerm}&role=${role}&sport=${sport}&startDate=${startDate}&endDate=${endDate}`
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
    startDate?: Date,
    endDate?: Date,

    select?: any
}

const useAdminSessions = (
    {
        page = 1,
        limit = default_limit,
        filter = default_filter,
        role = default_filter,
        sport = default_filter,
        startDate = default_startDate,
        endDate = default_endDate,
        searchTerm = "",
        select,
    }: IProps
) => {

    const { data, error, isLoading, isFetching, isError } = useQuery<ApiResponse>({
        queryKey: [KEY, page, limit, filter, searchTerm, role, sport, formatDate(startDate, FORMAT), formatDate(endDate, FORMAT)],
        queryFn: () =>
            fetchData({ page, limit, filter, searchTerm, role, sport, startDate, endDate }),
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

export default useAdminSessions;
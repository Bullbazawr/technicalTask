import seminarService from '../services/seminar.service'
import { useQuery } from '@tanstack/react-query'

//хук для получения всех данных
export const useAllseminars = (page: number) => {
    return useQuery({
        queryKey: ['seminars', page],
        queryFn: () => {
            return seminarService.getAllSeminars(page)
        },
        select: ({ data }) => data
    })
}
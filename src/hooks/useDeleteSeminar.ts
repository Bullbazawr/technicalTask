import { useMutation, useQueryClient } from '@tanstack/react-query'
import seminarService from '../services/seminar.service'

//хук для удаления 
export const useDeleteSeminar = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => await seminarService.deleteSeminar(id),
        onSuccess: () => queryClient.invalidateQueries()
    })
}
import { useQueryClient, useMutation } from '@tanstack/react-query'
import seminarService from '../services/seminar.service'

//хук для создания семинара
export const useCreateSeminar = (title: string, time: string, date: string, description: string, photo: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async () => await seminarService.createSeminar(title, time, date, description, photo),
        onSuccess: () => queryClient.invalidateQueries(),
    })
}
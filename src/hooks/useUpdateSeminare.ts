import { useMutation, useQueryClient } from '@tanstack/react-query'
import seminarService from '../services/seminar.service'
import { SeminarDTO } from '../interfaces/seminar.interface'

//хук для редактирования
export const useUpdateSeminar = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (updatedSeminar: SeminarDTO) =>
            seminarService.updateSeminar(
                updatedSeminar.title,
                updatedSeminar.time,
                updatedSeminar.date,
                updatedSeminar.description,
                updatedSeminar.photo,
                updatedSeminar.id
            ),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['seminars'] })
    })
}
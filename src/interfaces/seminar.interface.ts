
export interface SeminarDTO {
    id: string
    title: string
    description: string
    date: string
    time: string
    photo: string
}

export interface PaginatedResult<T> {
    data: T[]
    first: number
    last: number | null
    prev: number | null
    next: number | null
    pages: number
    items: number
}

export interface EditSeminarFormProps {
    seminar: SeminarDTO
    onClose: () => void
}
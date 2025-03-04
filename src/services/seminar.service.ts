import axios from 'axios'
import { SeminarDTO, PaginatedResult } from '../interfaces/seminar.interface'

class SeminarService {
    private URL = 'http://localhost:3000'

    async getAllSeminars(page: number) {
        return await axios.get<PaginatedResult<SeminarDTO>>(`${this.URL}/seminars?_page=${page}&_per_page=6`)
    }

    async deleteSeminar(id: string) {
        return await axios.delete(`${this.URL}/seminars/${id}`)
    }

    async createSeminar(title: string, time: string, date: string, description: string, photo: string) {
        return await axios.post<SeminarDTO>(`${this.URL}/seminars`, {
            id: Date.now().toString(),
            title,
            time,
            date,
            description,
            photo,
        })
    }
    async updateSeminar(title: string, time: string, date: string, description: string, photo: string, id: string) {
        return await axios.put(`${this.URL}/seminars/${id}`, {
            title,
            time,
            date,
            description,
            photo,
        })
    }
}

export default new SeminarService()
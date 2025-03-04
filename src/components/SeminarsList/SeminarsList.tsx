import { useState } from "react"
import { useAllseminars } from "../../hooks/useAllSeminars"
import { prevTasksPage, nextTasksPage } from "../../utils/changeTasksPage"
import { useQueryClient } from "@tanstack/react-query"
import { useDeleteSeminar } from "../../hooks/useDeleteSeminar"
import { SeminarDTO } from "../../interfaces/seminar.interface"
import { EditSeminarForm } from "../EditSeminarForm/EditSeminarForm"


export function SeminarsList() {
    const [editingSeminar, setEditingSeminar] = useState<SeminarDTO | null>(null) //устонавливаем состояние редактируемого семинрв
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1) // устанавливаем пагинаццию списка на первой странице
    const { data, isFetching, error } = useAllseminars(page) //получение всех семинаров из нашей базы данных
    const pages = data?.pages as number
    const { mutate: deleteSeminar } = useDeleteSeminar()


    function changeTasksPageHandler(e: React.MouseEvent) {
        if (e.currentTarget.textContent === 'назад') {
            setPage(prevTasksPage(page))
            setTimeout(() => {
                queryClient.invalidateQueries()
            }, 100)
        }
        if (e.currentTarget.textContent === 'вперед') {
            setPage(nextTasksPage(page, pages))
            setTimeout(() => {
                queryClient.invalidateQueries()
            }, 100)
        }
    }
    return (
        <div className='midleLeftContainer'>
            <div className='seminarsListContainer'>
                {isFetching && <p>Loading...</p>}
                {error && <p>Error: Что-то пошло не так</p>}
                <ul className='seminarList'>
                    {data?.data.length ? data?.data.map((seminar) => (
                        <li className='seminarsListItem'
                            key={seminar.id} >
                            <div className='seminarsListItemLeftBox'>
                                <div className="seminarElementContent">
                                    <p className='seminarTime'>{seminar.time}</p>
                                    <p className='seminarDate'>{seminar.date}</p>
                                    <p className='seminarTitle'>{seminar.title}</p>
                                    <p className='seminarDescription'>{seminar.description}</p>
                                </div>
                                <div className='seminarButtonsContainer'>
                                    <button className='button' onClick={() => deleteSeminar(seminar.id)}>Удалить</button>
                                    <button className='button' onClick={() => setEditingSeminar(seminar)}>Редактировать</button>
                                </div>
                            </div>
                            <img className='seminarImg' src={seminar.photo} alt='img' />
                        </li>
                    )) : <p> тут ничего нет </p>}
                </ul>
                {editingSeminar && (
                    <EditSeminarForm
                        seminar={editingSeminar}
                        onClose={() => setEditingSeminar(null)}
                    />
                )}
                <div className='seminarsListFooter'>
                    <button className='button' onClick={changeTasksPageHandler}>назад</button>
                    <p>Страница {1}</p>
                    <button className='button' onClick={changeTasksPageHandler}>вперед</button>
                </div>
            </div>
        </div>
    )
}

import { useState, useRef, useEffect } from 'react'
import { EditSeminarFormProps } from '../../interfaces/seminar.interface'
import { useUpdateSeminar } from '../../hooks/useUpdateSeminare'


export const EditSeminarForm: React.FC<EditSeminarFormProps> = ({ seminar, onClose }) => {
    //для формы редоктирования заполняем поля данными из вывбранного семинара
    const [title, setTitle] = useState(seminar.title)
    const [time, setTime] = useState(seminar.time)
    const [date, setDate] = useState(seminar.date)
    const [description, setDescription] = useState(seminar.description)
    const [photo, setPhoto] = useState(seminar.photo)
    const { mutate: updateSeminar, isPending } = useUpdateSeminar() //isPending чтоб блокировать кнопку отправки чтобы избежать двоиных кликов

    const titleInputRef = useRef<HTMLInputElement>(null) //создаем ref для инпута


    //устанавливаем фокус на инпут при появлении формы
    useEffect(() => {
        if (titleInputRef) {
            titleInputRef.current?.focus()
        }
    }, [])

    //обработчик отправки формы
    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        updateSeminar({
            id: seminar.id,
            title,
            time,
            date,
            description,
            photo,
        },
            {
                onSuccess: () => {
                    onClose()
                },
                onError: () => alert(`${seminar.id} Что-то пошло не так`),
            }

        )
    }

    return (
        <form onSubmit={submitHandler} className='seminarEditBox'>
            <div className='inputBox'>
                <p>Название</p>
                <input className='input'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    ref={titleInputRef} //привязываем ref к инпуту
                />
            </div>
            <div className='inputBox'>
                <p>Описание:</p>
                <input className='input'
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className='inputBox'>
                <p>Дата:</p>
                <input className='input'
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div className='inputBox'>
                <p>Время:</p>
                <input className='input'
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </div>
            <div className='inputBox'>
                <p>Фото (URL):</p>
                <input className='input'
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                />
            </div>
            <div className="submitButtonsBox">
                <button type="submit" disabled={isPending}>
                    Сохранить
                </button>
                <button type="button" onClick={onClose}>
                    Отмена
                </button>
            </div>
        </form>
    )
}
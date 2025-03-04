import { useCreateSeminar } from '../../hooks/useCreateSeminar'
import { useState } from 'react'
import { SyntheticEvent } from 'react'
import { formatEnteringTime } from '../../utils/formateEnteringTime'
export function SeminarCreator() {
  //создаем состояния для полей создания семинара
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState('')

  const { mutate: createSeminar } = useCreateSeminar(title, time, date, description, photo)
  
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/ //для проверки формата времени


  const createSeminarHandler = (e: SyntheticEvent) => {
    e.preventDefault()
    if (regex.test(time)) { //провер
      const formattedTime = formatEnteringTime(time)
      setTime(formattedTime)
      if (title && date) { //проверяем на пустоту заголовок и дату(не стал делать строгим формат даты)
        createSeminar()
      } else {
        alert('Заголовок и дата не могут быть пустыми') 
      }
    } else {
      alert('введите время в формате 24ч HH:MM')
    }
    setTimeout(() => {
      setTitle('')
      setTime('')
      setDate('')
      setDescription('')
      setPhoto('')
    }, 100)
  }

  return (
    <div className='seminarCreatorContainer'>
      <h2 className='seminarCreatorTitle'>Добавить новый семинар</h2>
      <div className='seter'>
        <p>Заголовок: </p>
        <input className='input' maxLength={20} type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="_____________" />
        <div className='seter'>
          <p>Дата: </p>
          <input
            className='input'
            value={date}
            type='text'
            onChange={(e) => setDate(e.target.value)}
            placeholder='_____________' />
        </div>
        <div className='seter'>
          <p>Время: </p>
          <input
            className='input'
            value={time}
            type='text'
            onChange={(e) => setTime(e.target.value)}
            placeholder='_____________' />
        </div>
        <div className='seter'>
          <p>Описание</p>
          <input className='input' type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='_____________' />
        </div>
        <div className='seter'>
          <p>Добавте путь к картинке: </p>
          <input
            className='input'
            value={photo}
            type='text'
            onChange={(e) => setPhoto(e.target.value)}
            placeholder='_____________' />
        </div>
        <button className='createTodoButton' onClick={createSeminarHandler}>Создать новый семинар</button>
      </div>
    </div>
  )
}
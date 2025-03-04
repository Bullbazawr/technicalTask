import { SeminarsList } from '../SeminarsList/SeminarsList'
import { SeminarCreator } from '../SeminarCreator/SeminarCreator'

export function HomePage() {
  return (
    <div className='mainContainer'>
      <SeminarsList />
      <SeminarCreator />
    </div>
  )
}
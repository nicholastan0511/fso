import { useEffect, useState } from 'react'
import { fetchDiaries } from './diaryService'
import { DiaryEntry } from './types'
import Diaries from './components/Diaries'
import DiaryForm from './components/DiaryForm'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    fetchDiaries()
      .then(data => setDiaries(data))
  }, [])

  return (
    <>
      <h1>Diary Entries</h1>  
      <DiaryForm setDiaries={setDiaries} diaries={diaries} />
      <Diaries diaries={diaries} />
    </>
  )
}

export default App

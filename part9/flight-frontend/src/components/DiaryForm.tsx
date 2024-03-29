import { useState } from "react"
import { addDiary } from "../diaryService";
import { DiaryEntry } from "../types";
import Notification from "./Notification";
import axios, {AxiosError} from "axios";

const DiaryForm = ({ diaries, setDiaries }: { diaries: DiaryEntry[], setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>> }) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('')

  const [notification, setNotification] = useState<any>('')

  const diaryCreation = (e: React.SyntheticEvent) => {
    e.preventDefault()
    addDiary({ date, weather, visibility, comment })
      .then(data => setDiaries(diaries.concat(data)))
      .catch ((error: AxiosError) => {
        if (axios.isAxiosError(error)) {
          setNotification(error.response?.data)
          setTimeout(() => {
            setNotification('')
          }, 5000);
        }
      })
  }

  return (
    <div>
      <Notification notification={notification} />
      <form onSubmit={diaryCreation}>
        <div>
          Date: <input type="text" onChange={({ target }) => setDate(target.value)} value={date} />
        </div>
        <div>
          Visibility: <input type="text" onChange={({ target }) => setVisibility(target.value)} value={visibility} />
        </div>
        <div>
          Weather: <input type="text" onChange={({ target }) => setWeather(target.value)} value={weather} />
        </div>
        <div>
          Comment: <input type="text" onChange={({ target }) => setComment(target.value)} value={comment} />
        </div>
        <button type="submit">add diary</button>
      </form>
    </div>
  )
}

export default DiaryForm;
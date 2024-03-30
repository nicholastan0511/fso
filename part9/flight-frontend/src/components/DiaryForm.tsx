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

  const [notification, setNotification] = useState<string>('')

  const diaryCreation = (e: React.SyntheticEvent) => {
    e.preventDefault()
    addDiary({ date, weather, visibility, comment })
      .then(data => setDiaries(diaries.concat(data)))
      .catch ((error: AxiosError) => {
        if (axios.isAxiosError(error) && isString(error.response?.data)) {
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
          Date: <input type="date" onChange={({ target }) => setDate(target.value)} value={date} />
        </div>
        <div>
          Visibility: 
          <div>
            <input type="radio" name="great" value="great" onChange={() => setVisibility('great')} />
            <label htmlFor="great">Great</label>
          </div>
          <div>
            <input type="radio" name="good" value="good" onChange={() => setVisibility('good')} />
            <label htmlFor="good">Great</label>
          </div>
          <div>
            <input type="radio" name="ok" value="ok" onChange={() => setVisibility('ok')} />
            <label htmlFor="ok">Ok</label>
          </div>
          <div>
            <input type="radio" name="poor" value="poor" onChange={() => setVisibility('poor')} />
            <label htmlFor="poor">Poor</label>
          </div>
        </div>
        <div>
          Weather:
          <div>
            <input type="radio" name="sunny" value="sunny" onChange={() => setWeather('sunny')} />
            <label htmlFor="sunny">Sunny</label>
          </div>
          <div>
            <input type="radio" name="cloudy" value="cloudy" onChange={() => setWeather('cloudy')} />
            <label htmlFor="cloudy">Cloudy</label>
          </div>
          <div>
            <input type="radio" name="Stormy" value="Stormy" onChange={() => setWeather('Stormy')} />
            <label htmlFor="Stormy">Poor</label>
          </div>
          <div>
            <input type="radio" name="rainy" value="rainy" onChange={() => setWeather('rainy')} />
            <label htmlFor="rainy">Rainy</label>
          </div>
          <div>
            <input type="radio" name="windy" value="windy" onChange={() => setWeather('windy')} />
            <label htmlFor="windy">Windy</label>
          </div>
        </div>
        <div>
          Comment: <input type="text" onChange={({ target }) => setComment(target.value)} value={comment} />
        </div>
        <button type="submit">add diary</button>
      </form>
    </div>
  )
}

const isString = (text: unknown): text is string=> {
  return Boolean(text instanceof String || typeof text === 'string') 
}

export default DiaryForm;
import { DiaryEntry } from "../types"
import Diary from "./Diary";

const Diaries = ({ diaries }: { diaries: DiaryEntry[]}) => {
  return (
    <div>
      {diaries.map(diary => <Diary diary={diary} key={diary.id}/>)}
    </div>
  )
}

export default Diaries;
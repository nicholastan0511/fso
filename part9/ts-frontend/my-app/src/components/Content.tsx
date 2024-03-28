import { CoursePart } from "../App";
import Part from "./Part";

const Content = ({ content }: { content: CoursePart[] }) => {
  return (
    <>
      {content.map(part => 
        <Part part={part} key={part.name}/>
      )}
    </>
  )
};

export default Content;
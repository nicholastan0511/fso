import { Title, Part, Total } from './subcomponents'

const Course = ({ course }) => {
    return (
      <div>
        <Title name={course.name}/>
        <div>
          {course.parts.map(part => 
            <Part key={part.id} partName={part.name} exercises={part.exercises}/>
          )}
          <Total total={course.parts}/>
        </div>
      </div>
    )
}

export default Course
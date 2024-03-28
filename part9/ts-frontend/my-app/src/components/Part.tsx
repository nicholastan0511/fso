import { CoursePart } from "../App"

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
        </>
      )
    case 'group':
      return (
        <>
          <h3>{part.name}</h3>
          <p>group project count: {part.groupProjectCount}</p>
        </>
      )
    case 'background':
      return (
        <>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>see {part.backgroundMaterial}</p>
        </>
      )
    case 'special':
      return (
        <>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>requirements include: {part.requirements.join(', ')}</p>
        </>
    )
    default:
      return assertNever(part)
  }
}

const assertNever = (value: never): never => {
  throw new Error (
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;

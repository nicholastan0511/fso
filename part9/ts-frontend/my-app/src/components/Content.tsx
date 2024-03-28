interface props {
  content: ContentType[];
};

interface ContentType {
  name: string;
  exerciseCount: number;
}

const Content = (props: props) => {
  return (
    <>
      <p>
        {props.content[0].name} {props.content[0].exerciseCount}
      </p>
      <p>
        {props.content[1].name} {props.content[1].exerciseCount}
      </p>
      <p>
        {props.content[2].name} {props.content[2].exerciseCount}
      </p>
    </>
  )
};

export default Content;
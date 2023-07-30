const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </div>
  );
};
const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};
const Content = (props) => {
  //console.log(props);
  const parts = props.parts;
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercise={part.exercises} />
      ))}
      {/* <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
        <Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
        <Part part={props.parts[2].name} exercise={props.parts[2].exercises} /> */}
    </>
  );
};
const Total = (props) => {
  let sum = props.total.reduce((sum, part) => (sum += part.exercises), 0);
  // props.total.forEach((element) => {
  //   sum += element.exercises;
  // });

  return (
    <>
      <h4>Number of exercises {sum}</h4>
    </>
  );
};
const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  );
};

export default Course
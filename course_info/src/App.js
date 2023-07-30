import Course from './components/Course'
const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 0,
      parts: [
        {
          id: 0,
          name: "Fundamentals of React",
          exercises: 10,
        },
        {
          id: 1,
          name: "Using props to pass data",
          exercises: 7,
        },
        {
          id: 2,
          name: "State of a component",
          exercises: 14,
        },
        {
          id: 3,
          name: "Redux",
          exercises: 11,
        },
      ],
    },
    {
      name: "Node.js",
      id: 1,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 0,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 1,
        },
      ],
    },
  ];
  // const part1 = "Fundamentals of React";
  // const exercises1 = 10;
  // const part2 = "Using props to pass data";
  // const exercises2 = 7;
  // const part3 = "State of a component";
  // const exercises3 = 14;

  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};


export default App;

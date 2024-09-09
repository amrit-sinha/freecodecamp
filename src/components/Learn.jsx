const CourseCard = ({ title }) => {
  return (
    <div className="course-card-container">
      <div className="course-card">{title}</div>
    </div>
  );
};

const Learn = () => {
  const courses = ["hello", "world", "freecodecamp"];
  return (
    <div className="learn">
      <h1>Welcome to freeCodeCamp.org</h1>
      <span>
        <q>I have not failed. I've just found 10,000 ways that won't work.</q>
        <footer>
          <cite>- Thomas A. Edison</cite>
        </footer>
      </span>
      <div>
        {courses.map((item) => {
          return <CourseCard title={item} />;
        })}
      </div>
    </div>
  );
};
export default Learn;

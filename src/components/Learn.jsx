import { useEffect, useState } from "react";
import axios from "axios";

const CourseCard = ({ title, duration }) => {
  return (
    <div className="course-card-container">
      <div className="course-card">
        <p>{title}</p>
        <p>({duration} hours)</p>
      </div>
    </div>
  );
};

const fetchCourses = async () => {
  const apiRoute = "https://freecodecamp-backend-esbl.onrender.com";
  const res = await axios.get(`${apiRoute}/api/auth/learn`);
  return res.data.courses;
};

const Learn = () => {
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      const courses = await fetchCourses();
      setCourseList(courses);
    };

    getCourses();
  }, []);

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
        {courseList.map((item) => (
          <CourseCard
            key={item._id}
            title={item.title}
            duration={item.duration}
          />
        ))}
      </div>
    </div>
  );
};

export default Learn;

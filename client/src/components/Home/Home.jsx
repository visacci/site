// src/pages/Home.js
import { React, useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
const Home = () => {
  const [comment, setComment] = useState("");
  const [coms, setComs] = useState([]);
  const url = "http://localhost:8000/api/comments/send";
  const url2 = "http://localhost:8000/api/comments";
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(url, { comment });
      setComs([...coms, res.data]);
      setComment("");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const comments = async () => {
      try {
        const res = await axios.get(url2);
        setComs(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    comments();
  }, []);
  const render = coms.map((comment) => {
    return <Comment comment={comment} key={comment._id} />;
  });
  console.log(coms);
  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to My Portfolio</h1>
      </header>
      <section id="home" className="home-introduction">
        <div className="left">
          <h2 className="h">Hi, I'm Katende ibrahim</h2>
          <p>
            I am a full-stack software engineer. I specialize in developing
            modern web applications using the latest technologies. Check out my
            work and get to know more about me.
          </p>
          <p>
            As a full-stack MERN developer, I specialize in leveraging the MERN
            stack—MongoDB, Express.js, React, and Node.js—to build robust and
            scalable web applications. My expertise spans both the frontend and
            backend aspects of development, allowing me to seamlessly integrate
            user interfaces with server-side logic and databases..
          </p>
          <p>
            On the frontend, I excel in crafting responsive and intuitive user
            experiences using React.js. I leverage its component-based
            architecture and state management capabilities to create dynamic
            interfaces that enhance user interaction and satisfaction. From
            designing sleek UI components to optimizing performance, I ensure
            that every aspect of the frontend aligns with both design principles
            and functional requirements
          </p>
          <p>
            Moving to the backend, I utilize Node.js and Express.js to develop
            efficient and secure APIs. Whether it's building RESTful APIs or
            implementing GraphQL endpoints, I prioritize scalability and
            maintainability while ensuring robust authentication and
            authorization mechanisms. I am adept at designing database schemas,
            utilizing MongoDB's flexibility to store and manage data in a
            schema-less manner that suits the dynamic needs of modern
            applications.
          </p>
          <p>
            As a full-stack developer, I thrive on bridging the gap between
            frontend and backend technologies. This includes implementing
            seamless data flow between components, optimizing application
            performance, and deploying applications to scalable cloud platforms
            like AWS or Heroku. My approach to development emphasizes clean code
            practices, continuous integration, and agile methodologies to
            deliver high-quality software solutions that meet client
            expectations and drive business growth.
          </p>
        </div>
        <div className="right">
          <img src="../../../public/1.jpg" alt="" className="img" />
          <div className="comments">
            <form className="in" onSubmit={handleSubmit}>
              <input
                type="text"
                className="c"
                placeholder="please leave a comment..."
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <button className="p" type="submit">
                send
              </button>
            </form>
            {render}
            <div className="count">{`${coms.length} comments`}</div>
            <div className="co">
              the comments above are submited and fetched from MongoDB with an
              api that i built my self using Node and Express.js
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

//comments
const Comment = (props) => {
  const { comment } = props.comment;
  return (
    <div className="cd">
      {" "}
      <div className="cm">{comment}</div>
    </div>
  );
};

export default Home;

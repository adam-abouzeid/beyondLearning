import "./AboutUs.css";
import img from "../../../../assets/about.jpg";
const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <div className="image-container">
        <img src={img} alt="" />
      </div>
      <div className="text-container">
        <h1>ABOUT US</h1>
        <h3>Why did we build this website?</h3>
        <br />
        <span>
          We built this website with a clear vision in mind - to make yours &
          our lives easier. We recognized the challenges faced by the office
          when it came to manually tracking inventory, managing order requests,
          and ensuring smooth operations. That's why we set out to develop a
          solution that would simplify these processes and empower teams to make
          magic real.
        </span>
      </div>
    </div>
  );
};

export default AboutUs;

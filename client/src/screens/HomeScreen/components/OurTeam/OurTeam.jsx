import "./OurTeam.css";
import Card from "./components/Card";

const OurTeam = ({ team }) => {
  return (
    <div className="our-team-container">
      <h1>Our Team</h1>
      <div className="our-team">
        {team.map((member, index) => {
          return (
            <Card
              key={index}
              name={member.name}
              position={member.position}
              img={member.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OurTeam;

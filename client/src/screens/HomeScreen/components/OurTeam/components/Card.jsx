import "./Card.css";

const Card = ({ img, name, position }) => {
  return (
    <div className="team-card">
      <img src={img} alt="" />
      <div className="team-card-info">
        <h3>{name}</h3>
        <p>{position}</p>
      </div>
    </div>
  );
};

export default Card;

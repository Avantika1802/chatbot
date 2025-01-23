import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute", // Position the container absolutely
        top: "10px", // Set distance from the top of the screen
        left: "10px", // Set distance from the left of the screen
        alignItems: "center", // Align image and text vertically
        gap: "15px",
      }}
    >
      <Link to={"/"}>
        <img
          src="openai.png"
          alt="openai"
          width={"30px"}
          height={"30px"}
          className="image-inverted"
        />
      </Link>
      <Typography
        sx={{
          display: { xs: "block", sm: "block", md: "block" },
          fontWeight: "800",
          textShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
          color: "white",
        }}
        style={{
          fontSize: "20px",
        }}
      >
        <span style={{ fontSize: "20px" }}>MERN</span>-GPT
      </Typography>
    </div>
  );
};

export default Logo;

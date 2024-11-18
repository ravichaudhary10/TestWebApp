import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import "./BackButton.styles.scss";

const BUTTON_TITLE = "Go back";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      label={BUTTON_TITLE}
      icon="pi pi-arrow-left"
      className="back-button"
      text
      onClick={() => navigate(-1)}
    />
  );
};

export default BackButton;

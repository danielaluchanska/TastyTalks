import PropTypes from "prop-types";
import './Button.css';

const Button = ({ onclick, label }) => {

  return (
    <div>
      <button className="btn" onClick={onclick}>{label}</button>
    </div>
  )
};

Button.propTypes = {
  onclick: PropTypes.func,
  label: PropTypes.string,
};
export default Button;
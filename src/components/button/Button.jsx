//styles
import './Button.css';

//components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Button(props) {
  const { clearSelects } = props;

  const handleReset = () => {
    clearSelects();
  };

  return (
    <button className='mobile-size' type="Reset" onClick={handleReset}>
      <FontAwesomeIcon className='Trash' icon={faTrash} /> Limpiar
    </button>
  )
};

export default Button;
import './Select.css';

function Select(props) {
  const {list, onChangeValue, value} = props;

  const handleNewValue = (event) => {
    onChangeValue(event.target.value);
  }

  return (
  <select className='mobile-size' value={value} onChange={handleNewValue}>
    { list.map((option, index) => <option key={index} value={option}>{option}</option>) }
  </select>
  )
}

export default Select;
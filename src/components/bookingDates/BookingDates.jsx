//syles
import './BookingDates.css';

//componente de selector de fechas
function BookingDates(props) {
  const { id, onChangeDate, value } = props;

  const handleBookingDates = (event) => {
    onChangeDate(event.target.value);
  };

  return (
    <input className='mobile-size' type="Date" onChange={handleBookingDates} id={id} value={value || ''}/>
  )
};

export default BookingDates;
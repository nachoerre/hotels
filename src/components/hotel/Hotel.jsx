//styles
import './Hotel.css';

//components
import Availability from '../availability/Availability';

//others
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBed, faDollarSign } from '@fortawesome/free-solid-svg-icons';


function Hotel(props) {
  const { name, photo, description, availabilityFrom, availabilityTo, rooms, city, country, price } = props;

  //cost function shows full dollar icons based on the hotel price.
  const cost = (price) => {
    const fullDollar = <FontAwesomeIcon className='icon dollar' icon={faDollarSign} />
    const emptyDollar = <FontAwesomeIcon className='icon dollar' style={{ color: 'rgba(255, 255, 255, 0.1)' }} icon={faDollarSign} />
    let totalDollar = [emptyDollar, emptyDollar, emptyDollar, emptyDollar];
    //the next cicle will push full dollar icons in the array above and pop out empty dollar icons at the same time.
    for (let i = 1; i <= price; i++) {
      totalDollar.unshift(fullDollar);
      totalDollar.pop()
    }
    return totalDollar;
  };

  return (
    <div className='hotel-card'>
      <img src={photo.default} alt="Fotos del hotel"></img>
      <div className='container'>
        <h2>{name}</h2>
        <div className='container-2 date'>Desde {Availability(availabilityFrom)}</div>
        <div className='container-2 date'>Hasta {Availability(availabilityTo)}</div>
        <p className='scroll-bar'>{description}</p>
        <div className='container-2'>
          <div className='icon-box'>
            <FontAwesomeIcon className='icon' icon={faMapMarkerAlt} />
          </div>
          <div className='text-box'>
            {city}, {country}
          </div>
        </div>
        <div className='box'>
          <div className='container-2'>
            <div className='icon-box'>
              <FontAwesomeIcon className='icon' icon={faBed}/>
            </div>
            <div className='text-box'>
              {rooms} Habitaciones
            </div>
          </div>
          <div className='container-2 price icon-box'>{cost(price)}</div>
        </div>
        <button className='container-2 booking'>Reservar</button>
      </div>
    </div>
  )
};

export default Hotel;
//styles
import './SelectMenu.css';
//components
import Select from '../select/Select';
import BookingDates from '../bookingDates/BookingDates';
import Button from '../button/Button';

//Following are the options the user can select to filter the search. 
const countries = ['Todos los Paises', 'Argentina', 'Chile', 'Uruguay', 'Brasil'];
const prices = ['Cualquier Precio', '$', '$$', '$$$', '$$$$'];
const sizes = ['Cualquier Tamaño', 'Tamaño Pequeño', 'Tamaño Mediano', 'Tamaño Grande'];

function SelectMenu(props) {
  const {onChangeCountry, onChangePrice, onChangeSize, country, price, size, clearSelects, checkInDate, checkOutDate, checkIn, checkOut } = props;

  return (
    <div className='select-menu'>
      <BookingDates id='From' onChangeDate={(dateIn)=>checkInDate(dateIn)} value={checkIn}/>
      <BookingDates id='To' onChangeDate={(dateOut)=>checkOutDate(dateOut)} value={checkOut}/>
      <Select list={countries} onChangeValue={(selectedCountry)=>onChangeCountry(selectedCountry)} value={country} />
      <Select list={prices} onChangeValue={(selectedPrice)=>onChangePrice(selectedPrice)} value={price} />
      <Select list={sizes} onChangeValue={(selectedSize)=>onChangeSize(selectedSize)} value={size} />
      <Button clearSelects={clearSelects} />
    </div>
  )
};

export default SelectMenu;
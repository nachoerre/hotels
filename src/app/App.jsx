//styles
import './App.css';

//data base
import hotelsData from '../DB/data';

//state
import { useState } from 'react';

//components
import Hotel from '../components/hotel/Hotel';
import SelectMenu from '../components/selectMenu/SelectMenu';
import Header from '../components/header/Header';

function App() {

  const [hotels, setHotels] = useState(hotelsData);
  const [checkIn, setCheckIn] = useState('Cualquier Fecha');
  const [checkOut, setCheckOut] = useState('Cualquier Fecha');
  const [country, setCountry] = useState('Todos los Paises');
  const [price, setPrice] = useState('Cualquier Precio');
  const [size, setSize] = useState('Cualquier Tamaño');

  //The next filter return the hotels that match with the user selections
  const allFilters = (dateIn, dateOut, selectedCountry, selectedPrice, selectedSize) => {
    const hotelFilter = hotelsData.filter((hotel) => {
      return (
        bookingDatesFilter(dateIn, dateOut, hotel) &&
        countryFilter(selectedCountry, hotel) &&
        priceFilter(selectedPrice, hotel) &&
        sizeFilter(selectedSize, hotel)
      )
    });
    setHotels(hotelFilter);
  };

  const bookingDatesFilter = (dateIn, dateOut, hotel) => {
    if (
      (new Date(dateIn).setHours(0, 0, 0, 0).valueOf() >= hotel.availabilityFrom &&
        new Date(dateOut).setHours(0, 0, 0, 0).valueOf() <= hotel.availabilityTo) ||
      (checkIn === 'Cualquier Fecha' && checkOut === 'Cualquier Fecha')
    ) {
      return true
    };
  };

  const countryFilter = (selectedCountry, hotel) => {
    if (selectedCountry === 'Todos los Paises') {
      return true
    } else {
      return hotel.country.toUpperCase() === selectedCountry.toUpperCase();
    };
  };

  const priceFilter = (selectedPrice, hotel) => {
    if (selectedPrice === '$') {
      return hotel.price === 1
    } else if (selectedPrice === '$$') {
      return hotel.price === 2
    } else if (selectedPrice === '$$$') {
      return hotel.price === 3
    } else if (selectedPrice === '$$$$') {
      return hotel.price === 4
    } else {
      return true
    };
  };

  const sizeFilter = (selectedSize, hotel) => {
    if (selectedSize === 'Tamaño Pequeño') {
      return hotel.rooms <= 10
    } else if (selectedSize === 'Tamaño Mediano') {
      return hotel.rooms > 10 && hotel.rooms <= 20
    } else if (selectedSize === 'Tamaño Grande') {
      return hotel.rooms > 20
    } else {
      return true
    };
  };

  const checkInDate = (dateIn) => {
    setCheckIn(dateIn);
    allFilters(dateIn, checkOut, country, price, size);
  };
  const checkOutDate = (dateOut) => {
    setCheckOut(dateOut);
    allFilters(checkIn, dateOut, country, price, size);
  };

  const onChangeCountry = (selectedCountry) => {
    setCountry(selectedCountry);
    allFilters(checkIn, checkOut, selectedCountry, price, size);
  };
  const onChangePrice = (selectedPrice) => {
    setPrice(selectedPrice);
    allFilters(checkIn, checkOut, country, selectedPrice, size);
  };
  const onChangeSize = (selectedSize) => {
    setSize(selectedSize);
    allFilters(checkIn, checkOut, country, price, selectedSize);
  };

  //when clicking on the "Limpiar" button you reset all the useStates.
  const handleClearSelects = () => {
    setCheckIn('Cualquier Fecha');
    setCheckOut('Cualquier Fecha');
    setCountry('Todos los Paises');
    setPrice('Cualquier Precio');
    setSize('Cualquier Tamaño');
    setHotels(hotelsData);
  };



  return (
    <div className="app">
      <header>
        <Header
          country={country}
          price={price}
          size={size}
          checkIn={checkIn}
          checkOut={checkOut}
        />
      </header>
      <div>
        <SelectMenu
          checkInDate={checkInDate}
          checkIn={checkIn}
          checkOutDate={checkOutDate}
          checkOut={checkOut}
          onChangeCountry={onChangeCountry}
          onChangePrice={onChangePrice}
          onChangeSize={onChangeSize}
          country={country}
          price={price}
          size={size}
          clearSelects={handleClearSelects}
        />
      </div>
      <main>
        {/* the following is to let the users know that it is needed to select a check out date
        if a check in date is selected and check in date can't be bigger than check out date*/
          checkIn !== 'Cualquier Fecha' && checkOut === 'Cualquier Fecha' ?
            <div className='not-found-message'>Por favor elija una fecha de salida</div> :
            checkIn === 'Cualquier Fecha' && checkOut !== 'Cualquier Fecha' ?
              <div className='not-found-message'>Por favor elija una fecha de entrada</div> :
              checkIn > checkOut ?
                <div className='not-found-message'>La fecha de salida no puede ser menor que la de entrada!</div> :
                hotels.length === 0 ?
                  <div className='not-found-message'>Lo sentimos, no hay hoteles que coincidan con su seleccion</div> :
                  hotels.map((item) => {
                    return (<Hotel
                      key={item.id}
                      name={item.name}
                      photo={item.photo}
                      description={item.description}
                      availabilityFrom={item.availabilityFrom}
                      availabilityTo={item.availabilityTo}
                      rooms={item.rooms}
                      city={item.city}
                      country={item.country}
                      price={item.price}
                    />
                    )
                  })
        }
      </main>
    </div>
  );
}

export default App;

import './App.css';
import Calendar from "./components/Calendar";


function App() {

    const defaultProps ={
        date: [[1, 2, 3, 4, 5, 6, 7],
        [8, 9 ,10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28],
        [29, 30, 31]],
        years:[2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
        monthNames:['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekDayNames:['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        onChange: Function.prototype,
    }

  return (
    <div>
      <Calendar defaultProps={defaultProps}/>
    </div>
  );
}

export default App;

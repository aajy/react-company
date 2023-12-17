import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.scss';

export default function Datepicker() {
  const [StartDate, setStartDate] = useState('');
	const [EndDate, setEndDate] = useState('');
	const [Month, setMonth] = useState(new Date().getMonth());

  const handleMonthChange = (date) => {
		setMonth(date.getMonth());
	};
  return (
    <div className='datePickerBox'>
      <div className='datePicker'>
        <DatePicker
          dateFormat='yyyy-MM-dd'
          className='input-datepicker'
          closeOnScroll={true}
          placeholderText='start date'
          selected={StartDate}
          onChange={(date) => {
            setStartDate(date.valueOf());
          }}
          onMonthChange={handleMonthChange}
        />
        <span>-</span>
        <DatePicker
          dateFormat='yyyy-MM-dd'
          className='input-datepicker'
          minDate={StartDate}
          closeOnScroll={true}
          placeholderText='end date'
          selected={EndDate}
          onChange={(date) => {
            setEndDate(date.valueOf());
          }}
          onMonthChange={handleMonthChange}
        />
      </div>
    </div>
  )
}

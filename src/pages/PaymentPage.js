import React from "react";

import Footer from "../components/layouts/Footer";
import Headers from "../components/layouts/Headers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import {
  registerLocale,
  //  setDefaultLocale
} from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function PaymentPage() {
  const [startDate, setStartDate] = useState();
  return (
    <div>
      <Headers />
      <DatePicker
        locale="th"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeInput
        dateFormat="Pp"
      />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {console.log(startDate)}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </div>
  );
}

export default PaymentPage;

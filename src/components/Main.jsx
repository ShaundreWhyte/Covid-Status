import React, { useEffect, useState } from "react";
import axios from "axios";

import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $, { ready } from "jquery";

var dt = require("datatables.net")();
export default function Main() {
  const [coviddata, setcoviddata] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.covid19api.com/summary")
      .then((res) => {
        console.log(res.data);
        setcoviddata(res.data.Countries);
      })
      .catch((err) => {
        console.log(err);
      });

    $(document).ready(function () {
      $("#table_id").DataTable();
    });
  }, [coviddata]);

  const tabledata = coviddata.map((obj) => {
    return (
      <tr>
        <td>{obj.Country}</td>
        <td>{obj.TotalConfirmed}</td>
        <td>{obj.TotalDeaths}</td>
        <td>{obj.Date}</td>
      </tr>
    );
  });

  return (
    <div>
      <h1 className="border">CovidStatus </h1>
      <br></br>
      <br></br>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <table
            id="table_id"
            class=" table table p-3 mb-2 bg-success bg-gradient"
          >
            <thead>
              <tr>
                <th> Country</th>

                <th> Confirm</th>
                <th> Deaths</th>
                <th> Dates </th>
              </tr>
            </thead>
            <tbody>{tabledata}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

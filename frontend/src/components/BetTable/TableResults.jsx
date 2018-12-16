import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function ResultTable(props) {
  return (
    <div>
    <table id="customers" className="st_header">
      <thead >
        <tr>
          <th>Round</th>
          <th>Results</th>
          <th>Table</th>
        </tr>
      </thead>
    </table>
    <table id="customers">
      <tbody>
      {
          props.data.ResultTable.map(
            row =>{
              return(
                <tr>
                <td>{row.Round}</td>
                <td>{row.Results}</td>
                <td>{row.Total}</td>
              </tr>                
              );              
            }
          )
        }
      </tbody>
    </table>
    </div>
  );
}

export default ResultTable;

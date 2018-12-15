import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function AllBetTable(props) {
  return (
    <div>
    <table id="customers" className="st_header">
      <thead >
        <tr>
          <th>Block ID</th>
          <th>Player</th>
          <th>Prediction</th>
          <th>Bet</th>
          <th>Type</th>
        </tr>
      </thead>
    </table>
    <table id="customers">
      <tbody>
      {
          props.data.AllBetTable.map(
            row =>{
              return(
                <tr>
                <td>{row.BlockID}</td>
                <td>{row.Player}</td>
                <td>{row.Prediction}</td>
                <td>{row.Bet}</td>
                <td>{row.Type}</td>
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

export default AllBetTable;

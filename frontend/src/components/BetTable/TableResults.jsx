import React, { Component } from "react";
import DiceCase from 'components/BetTable/DiceCases/DiceCase.jsx';
import "./styles.css";

function ResultTable(props) {
  return (
    <div>
    <table id="customers" className="st_header">
        <colgroup>
          <col width="70%" />
          <col width="30%" />
        </colgroup>
      <thead >
        <tr>
          <th>Results</th>
          <th>Total</th>
        </tr>
      </thead>
    </table>
    <table id="customers">
        <colgroup>
          <col width="70%" />
          <col width="30%" />
        </colgroup>
      <tbody>
      {
          props.data.ResultTable.map(
            row =>{
              return(
                <tr>
                  <td><DiceCase
                    type={1}
                    value={0}
                    dice1={1}
                    dice2={5}
                    dice3={3} />
                  </td>
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

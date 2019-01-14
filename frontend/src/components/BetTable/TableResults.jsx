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
                    dice1={row.dice1}
                    dice2={row.dice2}
                    dice3={row.dice3} />
                  </td>
                  <td>{row.Total}
                    <span
                      style={{
                        color: "#fadb00",
                        fontWeight: "600",
                        textShadow: "0 0 3px #fadb00",
                        display: "block",
                        paddingTop: "5px"
                      }}
                    >
                      {row.Total <= 10 ? <div>SMALL</div> : <div>BIG</div>}
                    </span>
                  </td>
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

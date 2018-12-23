import React from "react";
import DiceCase from 'components/BetTable/DiceCases/DiceCase.jsx';
import "./styles.css";

function MyBetTable(props) {
  return (
    <div style = {{borderCollapse:"collapse"}}>
      {/* we seperate 2 tables: one for header, one for content.
      The reason behind this is: for the sticky header (it is a limited of chrome) */}
      <table id="customers" className="st_header">
        <colgroup>
          <col width="50%" />
          <col width="50%" />
        </colgroup>
        <thead>
          <tr>
            <th>Round</th>
            <th>Bet</th>
          </tr>
        </thead>
      </table>
      <table id="customers">
        <colgroup>
          <col width="50%" />
          <col width="50%" />
        </colgroup>
        <tbody>
          {props.data.MyBetTable.map(row => {
            return (
              <tr>
                <td>{row.round}
                  <span
                    style={{
                      color: "#fadb00",
                      fontWeight: "600",
                      textShadow: "0 0 3px #fadb00",
                      display: "block",
                      paddingTop: "5px"
                    }}
                  >
                    {row.bet}
                  </span>
                </td>
                <td>
                  <DiceCase
                    type={row.type}
                    value={row.value}
                    dice1={row.dice1}
                    dice2={row.dice2}
                    dice3={row.dice3}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MyBetTable;

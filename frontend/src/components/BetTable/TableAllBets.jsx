import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import DiceCase from 'components/BetTable/DiceCases/DiceCase.jsx';

function AllBetTable(props) {
  return (
    <div>
      <table id="customers" className="st_header">
        <colgroup>
          <col width="50%" />
          <col width="50%" />
        </colgroup>
        <thead>
          <tr>
            <th>Player</th>
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
          {props.data.AllBetTable.map(row => {
            return (
              <tr>
                <td>{row.player}
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

export default AllBetTable;

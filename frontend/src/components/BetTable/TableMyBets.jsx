import React from "react";

import "./styles.css";

function MyBetTable(props) {
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
        <tr>
          <td>{props.data.MyBetTable[0].BlockID}</td>
          <td>{props.data.MyBetTable[0].Player}</td>
          <td>{props.data.MyBetTable[0].Prediction}</td>
          <td>{props.data.MyBetTable[0].Bet}</td>
          <td>{props.data.MyBetTable[0].Type}</td>
        </tr>
        <tr>
          <td>{props.data.MyBetTable[1].BlockID}</td>
          <td>{props.data.MyBetTable[1].Player}</td>
          <td>{props.data.MyBetTable[1].Prediction}</td>
          <td>{props.data.MyBetTable[1].Bet}</td>
          <td>{props.data.MyBetTable[1].Type}</td>
        </tr>
        <tr>
          <td>{props.data.MyBetTable[2].BlockID}</td>
          <td>{props.data.MyBetTable[2].Player}</td>
          <td>{props.data.MyBetTable[2].Prediction}</td>
          <td>{props.data.MyBetTable[2].Bet}</td>
          <td>{props.data.MyBetTable[2].Type}</td>
        </tr>
        <tr>
          <td>{props.data.MyBetTable[3].BlockID}</td>
          <td>{props.data.MyBetTable[3].Player}</td>
          <td>{props.data.MyBetTable[3].Prediction}</td>
          <td>{props.data.MyBetTable[3].Bet}</td>
          <td>{props.data.MyBetTable[3].Type}</td>
        </tr>
        <tr>
          <td>{props.data.MyBetTable[4].BlockID}</td>
          <td>{props.data.MyBetTable[4].Player}</td>
          <td>{props.data.MyBetTable[4].Prediction}</td>
          <td>{props.data.MyBetTable[4].Bet}</td>
          <td>{props.data.MyBetTable[4].Type}</td>
        </tr>
        <tr>
          <td>{props.data.MyBetTable[4].BlockID}</td>
          <td>{props.data.MyBetTable[4].Player}</td>
          <td>{props.data.MyBetTable[4].Prediction}</td>
          <td>{props.data.MyBetTable[4].Bet}</td>
          <td>{props.data.MyBetTable[4].Type}</td>
        </tr>
        <tr>
          <td>{props.data.MyBetTable[4].BlockID}</td>
          <td>{props.data.MyBetTable[4].Player}</td>
          <td>{props.data.MyBetTable[4].Prediction}</td>
          <td>{props.data.MyBetTable[4].Bet}</td>
          <td>{props.data.MyBetTable[4].Type}</td>
        </tr>
        <tr>
          <td>{props.data.MyBetTable[4].BlockID}</td>
          <td>{props.data.MyBetTable[4].Player}</td>
          <td>{props.data.MyBetTable[4].Prediction}</td>
          <td>{props.data.MyBetTable[4].Bet}</td>
          <td>{props.data.MyBetTable[4].Type}</td>
        </tr>
        <tr>
          <td>{props.data.MyBetTable[4].BlockID}</td>
          <td>{props.data.MyBetTable[4].Player}</td>
          <td>{props.data.MyBetTable[4].Prediction}</td>
          <td>{props.data.MyBetTable[4].Bet}</td>
          <td>{props.data.MyBetTable[4].Type}</td>
        </tr>
        <tr>
          <td>{props.data.MyBetTable[4].BlockID}</td>
          <td>{props.data.MyBetTable[4].Player}</td>
          <td>{props.data.MyBetTable[4].Prediction}</td>
          <td>{props.data.MyBetTable[4].Bet}</td>
          <td>{props.data.MyBetTable[4].Type}</td>
        </tr>
      </tbody>
    </table>
    </div>
  );
}

export default MyBetTable;

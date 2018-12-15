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
        <tr>
          <td>{props.data.ResultTable[0].Round}</td>
          <td>{props.data.ResultTable[0].Results}</td>
          <td>{props.data.ResultTable[0].Total}</td>
        </tr>
        <tr>
          <td>{props.data.ResultTable[1].Round}</td>
          <td>{props.data.ResultTable[1].Results}</td>
          <td>{props.data.ResultTable[1].Total}</td>
        </tr>
        <tr>
          <td>{props.data.ResultTable[2].Round}</td>
          <td>{props.data.ResultTable[2].Results}</td>
          <td>{props.data.ResultTable[2].Total}</td>
        </tr>
        <tr>
          <td>{props.data.ResultTable[3].Round}</td>
          <td>{props.data.ResultTable[3].Results}</td>
          <td>{props.data.ResultTable[3].Total}</td>
        </tr>
        <tr>
          <td>{props.data.ResultTable[4].Round}</td>
          <td>{props.data.ResultTable[4].Results}</td>
          <td>{props.data.ResultTable[4].Total}</td>
        </tr>
        <tr>
          <td>{props.data.ResultTable[4].Round}</td>
          <td>{props.data.ResultTable[4].Results}</td>
          <td>{props.data.ResultTable[4].Total}</td>
        </tr>
        <tr>
          <td>{props.data.ResultTable[4].Round}</td>
          <td>{props.data.ResultTable[4].Results}</td>
          <td>{props.data.ResultTable[4].Total}</td>
        </tr>
        <tr>
          <td>{props.data.ResultTable[4].Round}</td>
          <td>{props.data.ResultTable[4].Results}</td>
          <td>{props.data.ResultTable[4].Total}</td>
        </tr>
        <tr>
          <td>{props.data.ResultTable[4].Round}</td>
          <td>{props.data.ResultTable[4].Results}</td>
          <td>{props.data.ResultTable[4].Total}</td>
        </tr>
        <tr>
          <td>{props.data.ResultTable[4].Round}</td>
          <td>{props.data.ResultTable[4].Results}</td>
          <td>{props.data.ResultTable[4].Total}</td>
        </tr>
      </tbody>
    </table>
    </div>
  );
}

export default ResultTable;

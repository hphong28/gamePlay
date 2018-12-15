import React from "react";
import MyBetTable from "./TableMyBets.jsx";
import AllBetTable from "./TableAllBets.jsx";
import ResultTable from "./TableResults.jsx";
import "./styles.css";

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BetData: {
        MyBetTable: [
          {
            BlockID: "920",
            Player: "Blockdevteam",
            Prediction: "1 1 1",
            Bet: "2 EOS",
            Type: "WIN"
          },
          {
            BlockID: "920",
            Player: "Blockdevteam",
            Prediction: "1 1 1",
            Bet: "2 EOS",
            Type: "WIN"
          },
          {
            BlockID: "920",
            Player: "Blockdevteam",
            Prediction: "1 1 1",
            Bet: "2 EOS",
            Type: "WIN"
          },
          {
            BlockID: "920",
            Player: "Blockdevteam",
            Prediction: "1 1 1",
            Bet: "2 EOS",
            Type: "WIN"
          },
          {
            BlockID: "920",
            Player: "Blockdevteam",
            Prediction: "1 1 1",
            Bet: "2 EOS",
            Type: "WIN"
          }
        ],

        AllBetTable: [
          {
            BlockID: "100",
            Player: "BlockEOSteam",
            Prediction: "2 2 2",
            Bet: "200 EOS",
            Type: "WIN"
          },
          {
            BlockID: "100",
            Player: "BlockEOSteam",
            Prediction: "2 2 2",
            Bet: "200 EOS",
            Type: "WIN"
          },
          {
            BlockID: "920",
            Player: "Blockdevteam",
            Prediction: "1 1 1",
            Bet: "2 EOS",
            Type: "WIN"
          },
          {
            BlockID: "100",
            Player: "BlockEOSteam",
            Prediction: "2 2 2",
            Bet: "200 EOS",
            Type: "WIN"
          },
          {
            BlockID: "100",
            Player: "BlockEOSteam",
            Prediction: "2 2 2",
            Bet: "200 EOS",
            Type: "WIN"
          },
          {
            BlockID: "100",
            Player: "BlockEOSteam",
            Prediction: "2 2 2",
            Bet: "200 EOS",
            Type: "WIN"
          }
        ],

        ResultTable: [
          { Round: 1, Results: "2 2 2", Total: 6 },
          { Round: 1, Results: "2 2 2", Total: 6 },
          { Round: 1, Results: "2 2 2", Total: 6 },
          { Round: 1, Results: "2 2 2", Total: 6 },
          { Round: 1, Results: "2 2 2", Total: 6 }
        ]
      },
      index: 0
    };

    this.handleClick = this.handleClick.bind(this);
}

  handleClick(i) {
    this.setState({ index: i });
  }

  render() {
    return (
      <div className="myApp">
        <div className="tab">
          <button className={this.state.index ===0 ?"active":"" } onClick={() => this.handleClick(0)}>
            My bets
          </button>

          <button className={this.state.index ===1 ?"active":""} onClick={() => this.handleClick(1)}>
            All bets
          </button>

          <button className={this.state.index ===2 ?"active":""} onClick={() => this.handleClick(2)}>
            Results
          </button>
        </div>
        <div className="tabcontent">
          <TabContent index={this.state.index} data={this.state.BetData} />
        </div>
        <div className="footWrapper">
          <div className="footerContent">
              <p className="column"> BlockDevTeam </p>
              <p className="column"> 25 EOS </p>
          </div>
        </div>
      </div>
    );
  }
}

function TabContent(props) {
  if (props.index === 0) {
    return <MyBetTable data={props.data} />;
  } else if (props.index === 1) {
    return <AllBetTable data={props.data} />;
  } else if (props.index === 2) {
    return <ResultTable data={props.data} />;
  } else {
    //do nothing
  }
}

export default Tab;

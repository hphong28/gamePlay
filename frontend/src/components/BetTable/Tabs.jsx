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
      index: 0,
      tab1Active: "tablinks active",
      tab2Active: "tablinks",
      tab3Active: "tablinks"
    };

    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
  }

  handleClick1() {
    this.setState({ index: 0 });
    this.setState({ tab1Active: "tablinks active" });
    this.setState({ tab2Active: "tablinks" });
    this.setState({ tab3Active: "tablinks" });

    console.log(this.state.index);
    console.log(this.state.tab1Active);
    console.log(this.state.tab2Active);
    console.log(this.state.tab3Active);

    console.log("hello world");
  }

  handleClick2() {
    this.setState({ index: 1 });

    this.setState({ tab1Active: "tablinks" });
    this.setState({ tab2Active: "tablinks active" });
    this.setState({ tab3Active: "tablinks" });

    console.log(this.state.index);
    console.log(this.state.tab1Active);
    console.log(this.state.tab2Active);
    console.log(this.state.tab3Active);

    console.log("hello everybody");
  }

  handleClick3() {
    this.setState({ index: 2 });

    this.setState({ tab1Active: "tablinks" });
    this.setState({ tab2Active: "tablinks" });
    this.setState({ tab3Active: "tablinks active" });


  }

  render() {
    return (
      <div className="myApp">
        <div className="tab">
          <button className={this.state.tab1Active} onClick={this.handleClick1}>
            My bets
          </button>

          <button className={this.state.tab2Active} onClick={this.handleClick2}>
            All bets
          </button>

          <button className={this.state.tab3Active} onClick={this.handleClick3}>
            Results
          </button>
        </div>
        <div className="tabcontent">
          {/*if you set overflow in "scroll", there will be 2 sroll: at the right side and at the bottom*/}
          <div style={{ maxHeight: "400px", overflow: "auto" }}>
            <TabContent index={this.state.index} data={this.state.BetData} />
          </div>
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

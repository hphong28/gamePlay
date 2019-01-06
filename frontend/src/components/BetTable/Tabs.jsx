import React from "react";
import MyBetTable from "./TableMyBets.jsx";
import AllBetTable from "./TableAllBets.jsx";
import ResultTable from "./TableResults.jsx";
import "./styles.css";
import { ApiService } from 'services';
import { connect } from 'react-redux';
// Services and redux action
import { UserAction } from 'actions';

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BetData: {
        MyBetTable: [],

        AllBetTable: [],

        ResultTable: []
      },
      index: 0
    };

    this.timer = 0; // to contain the value return from setInterval function
    this.handleClick = this.handleClick.bind(this);

}
  getMyBet = () => {
    ApiService.getMyBet("ilovedice123", 20).then(bets => { 
      // if there is a new bet then myBetTable will be updated
      if (bets.length > this.state.BetData.MyBetTable.length) {
        //this temp variable is a workaround for updating nested state
        let temp = this.state.BetData.MyBetTable;
        temp = [];
        this.setState({
          temp
        });

        bets.map((item, index) => {
          this.state.BetData.MyBetTable.push(
            {
              round: 1,
              type: 2,
              value: 5,
              dice1: 2,
              dice2: 3,
              dice3: 4,
              bet: "200 EOS"
            });
          // - tempAllBet is the reference to the BetData.AllBetTable[index]
          // - Cannot take the reference to BetData because we can only take reference 
          //   to "one level" oject
          const tempAllBet = this.state.BetData.MyBetTable[index];
          tempAllBet.round = item.round;
          tempAllBet.bet = item.bet_amount;
          [tempAllBet.type, tempAllBet.value] = this.betCaseMapping(item.bet_case);

          // when the variable contain the reference is changed then the original 
          // element is changed also
          this.setState({
            tempAllBet
          });
        });
      }
      else {
        //do nothing
      }

    });
  }

  getAllBet = () => {
    ApiService.getAllBet(20).then(bets => { 
      // if there is a new bet then myBetTable will be updated
      if (bets.length > this.state.BetData.AllBetTable.length) {
        //this temp variable is a workaround for updating nested state
        let temp = this.state.BetData.AllBetTable;
        temp = [];
        this.setState({
          temp
        });

        bets.map((item, index) => {
          this.state.BetData.AllBetTable.push(
            {
              player: "BlockEOSteam",
              type: 1,
              value: 5,
              dice1: 2,
              dice2: 3,
              dice3: 4,
              bet: "200 EOS"
            });
          // - tempAllBet is the reference to the BetData.AllBetTable[index]
          // - Cannot take the reference to BetData because we can only take reference 
          //   to "one level" oject
          const tempAllBet = this.state.BetData.AllBetTable[index];
          tempAllBet.player = item.bettor;
          tempAllBet.bet = item.bet_amount;
          [tempAllBet.type, tempAllBet.value] = this.betCaseMapping(item.bet_case);

          // when the variable contain the reference is changed then the original 
          // element is changed also
          this.setState({
            tempAllBet
          });
        });
      }
      else {
        //do nothing
      }

    });
  }

  getRecords = () => {
    ApiService.getRecords(20).then(bets => { 
      // if there is a new bet then myBetTable will be updated
      if (bets.length > this.state.BetData.ResultTable.length) {
        //this temp variable is a workaround for updating nested state
        let temp = this.state.BetData.ResultTable;
        temp = [];
        this.setState({
          temp
        });

        bets.map((item, index) => {
          this.state.BetData.ResultTable.push(
            {
              dice1: 1,
              dice2: 1,
              dice3: 1,
              Total: 3
            });
          // - tempAllBet is the reference to the BetData.AllBetTable[index]
          // - Cannot take the reference to BetData because we can only take reference 
          //   to "one level" oject
          const tempAllBet = this.state.BetData.ResultTable[index];
          [tempAllBet.dice1, tempAllBet.dice2, tempAllBet.dice3] = [item.dice_one, item.dice_two, item.dice_three];

          tempAllBet.Total = (item.dice_one + item.dice_two + item.dice_three);          

          // when the variable contain the reference is changed then the original 
          // element is changed also
          this.setState({
            tempAllBet
          });
        });
      }
      else {
        //do nothing
      }

    });
  }

  componentDidMount() {
    this.timer = setInterval(this.updateData, 1000);
    
  }


  updateData = () => { 
    this.getMyBet();
    this.getAllBet();
    this.getRecords();
  }

  betCaseMapping = (param) => { 
    let returnValue;
    //-passing data between function is by value not by reference 
    //-passing data between object is by reference 
    if(/SMALL/.test(param))
    {
      returnValue = [4,4];
    }
    else if(/BIG/.test(param))
    {
      returnValue = [4,17];
    }
    else if(/SINGLE/.test(param))
    {
      // regex function exec return an array, the first data is the matched value
      returnValue = [3,/\d/.exec(param)[0]];
    }
    else if(/TRIPLE/.test(param))
    {
      returnValue = [1,/\d/.exec(param)[0]];
    }
    else if(/NUM/.test(param))
    {
      returnValue = [2,/\d/.exec(param)[0]];
    }
    else
    {
      //do nothing
    }
    return returnValue;
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
            Records
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

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Map the following action to props
const mapDispatchToProps = {
  setUser: UserAction.setUser,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(Tab);

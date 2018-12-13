// React core
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components

import { Header, BetTable, PlayMenu, Referral } from 'components';
import DiceBoard from 'components/DiceBoard/DiceBoard.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Referral: false,
    }

    this.handleReferralAction = this.handleReferralAction.bind(this);
    // this.handleReferral = this.handleReferral.bind(this);
  }

  handleReferralAction() {

    console.log('tam_ handle referral');
    this.setState({ Referral: !this.state.Referral })


  }

  render() {
    const dice = {
      countDown: true,
      time2dice: 1,
      numberOfDices: 3,

      dice1timer: "4s",
      dice1value: 1,

      dice2timer: "3s",
      dice2value: 3,

      dice3timer: "2s",
      dice3value: 4
    };

    return (
      <div className="App">
        <Header {...this.props} handleReferral={this.handleReferralAction} />
        {/* <Header {...this.props} /> */}

        {
          this.state.Referral ?
          <div className="play_menu">
            <Referral />
          </div>
          : 
          <div >
          <div className="dice_board">

            <div className="dice_board_center">
              <DiceBoard />
            </div>

          </div>
          <div className="dice_table">
            <BetTable />
          </div>

          <div className="play_menu">
            <PlayMenu/>
          </div> 

        </div>
        }




      </div>
    );
  }

}

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Export a redux connected component
export default connect(mapStateToProps)(App);

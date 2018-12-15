// React core
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components

import { Header, BetTable, PlayMenu, Referral, HowToPlay } from 'components';
import DiceBoard from 'components/DiceBoard/DiceBoard.jsx';
import RollingDice from 'components/Dice/RollingDice.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Referral: false,
      HowToPlay: false,
    }

    this.handleReferralAction = this.handleReferralAction.bind(this);
    this.handleHowToPlayAction = this.handleHowToPlayAction.bind(this);
  }

  handleReferralAction() {
    console.log('tam_ handle referral');
    this.setState({
      Referral: !this.state.Referral,
      HowToPlay: false
    })
  }
  handleHowToPlayAction() {
    console.log('tam_ handle HowToPlay');
    this.setState({
      HowToPlay: !this.state.HowToPlay,
      Referral: false
    })
  }

  render() {

    return (
      <div className="App">
        <Header {...this.props}
          handleReferral={this.handleReferralAction}
          handleHowToPlay={this.handleHowToPlayAction} />

        {
          this.state.Referral ?
            <div className="How_To_Play">
              <Referral />
            </div>
            :
            null
        }

        {
          this.state.HowToPlay ?
            <div className="How_To_Play">
              <HowToPlay />
            </div>
            : 
            null
        }

        {
          ((this.state.Referral == false) && (this.state.HowToPlay == false))?
            <div >
              <div className="dice_board">
              <RollingDice
                phase={0}
                counttimer={12}
                dice1={1}
                dice2={5}
                dice3={3}
            />

                <div className="dice_board_center">
                  <DiceBoard />
                </div>

              </div>
              <div className="dice_table">
                <BetTable />
              </div>

              <div className="play_menu">
                <PlayMenu />
              </div>

          </div>
          :
            null
        }
      </div>
    );
  }
}

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Export a redux connected component
export default connect(mapStateToProps)(App);

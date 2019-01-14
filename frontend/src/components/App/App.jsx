// React core
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components

import { Header, BetTable, PlayMenu } from 'components';
import DiceBoard from 'components/DiceBoard/DiceBoard.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div className="App">
        <Header {...this.props} />

        <div className="dice_board">
          <div className="dice_board_center">
            <DiceBoard />
            {/* <PlayMenu /> */}
          </div>

        </div>
        <div className="dice_table">
          <BetTable />
        </div>
      </div>
    );
  }
}

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Export a redux connected component
export default connect(mapStateToProps)(App);

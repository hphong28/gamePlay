// React core
import React, { Component } from 'react';
import { connect } from 'react-redux';

import bet0_5 from './images/0_5.png'
import bet1 from './images/1.png'
import bet2 from './images/2.png'
import bet5 from './images/5.png'
import bet10 from './images/10.png'
import LogoBetAmount from './images/LogoBetAmount.png'


class PlayMenu extends Component {

  render() {

    return (
      <div className="menuPlay">
        <div className="HeaderPlayMenu">
          BET AMOUNT
        </div>
        <div className="BetAmount">
            <img src={LogoBetAmount} alt=" " className="BetAmountLogo" />
            <div className="BetAmountValue"> 5.0</div>
            <div className="BetAmountToken"> EOS</div>
        </div>

        <div className="WrapIconBet">
          <ul>
              <li><a href="https://mail.google.com/"><img src={bet0_5} alt=" " className="iconBet" /></a></li>
              <li><a href="https://mail.google.com/"><img src={bet1} alt=" " className="iconBet" /></a></li>
              <li><a href="https://mail.google.com/"><img src={bet2} alt=" " className="iconBet" /></a></li>
              <li><a href="https://mail.google.com/"><img src={bet5} alt=" " className="iconBet" /></a></li>
              <li><a href="https://mail.google.com/"><img src={bet10} alt=" " className="iconBet" /></a></li>
          </ul> 
        </div>

        <div className="WrapTableBetAndButton">
          <div className="WrapTableBet">
            <table className="TableBet">
              <thead>
                <tr>
                  <td>BET AMOUNT</td>
                  <td>PAYOUT TO WIN</td>
                  <td>PREDICTION</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>... </td>
                  <td>... </td>
                  <td>... </td>
                </tr>
                <tr>
                  <td>... </td>
                  <td>... </td>
                  <td>... </td>
                </tr>
              </tbody>
            </table>

          </div>

          <button className="PlayButton">PLAY</button>

        </div>
        

      </div>
    );
  }

}

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Export a redux connected component
export default connect(mapStateToProps)(PlayMenu);
// React core
import React, { Component } from 'react';
import { connect } from 'react-redux';

import bet0_5 from './images/0_5.svg'
import bet1 from './images/1.svg'
import bet2 from './images/2.svg'
import bet5 from './images/5.svg'
import bet10 from './images/10.svg'
import LogoBetAmount from './images/LogoBetAmount.png'


class PlayMenu extends Component {

  render() {

    return (
      <div className="menuPlay">

        <div className="WrapIconBet">
          <ul>
            <li><img src={bet0_5} alt=" " className="iconBet" /></li>
            <li><img src={bet1} alt=" " className="iconBet" /></li>
            <li><img src={bet2} alt=" " className="iconBet" /></li>
            <li><img src={bet5} alt=" " className="iconBet" /></li>
            <li><img src={bet10} alt=" " className="iconBet" /></li>
          </ul>
        </div>

        <div className="BetAmount_Wrap">

          <div className="BetAmount">
            <img src={LogoBetAmount} alt=" " className="BetAmountLogo" />
            <div className="BetAmountValue"> 5.0</div>
            <div className="BetAmountToken"> EOS</div>
          </div>

          <div className="info_wrap">
            <div className="info_value">100%</div>
            <div className="info_label">CPU</div>
          </div>

          <div className="info_wrap">
            <div className="info_value">100%</div>
            <div className="info_label">NET</div>
          </div>




        </div>





        {/* <div className="inforIcon_Wrap">
          <div className="info_wrap">
            <div className="info_value">100%</div>
            <div className="info_label">CPU</div>
          </div>

          <div className="info_wrap">
            <div className="info_value">100%</div>
            <div className="info_label">NET</div>
          </div>
        </div> */}


      </div>
    );
  }

}

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Export a redux connected component
export default connect(mapStateToProps)(PlayMenu);
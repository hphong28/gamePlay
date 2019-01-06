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
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
        chip: 0,
    };
  }
  handleClick = (value) => (e) => {
    this.setState({ chip: value == this.state.chip ? 0 :value });
    this.props.onSelectedChip(value == this.state.chip ? 0 :value );
  };  

  render() {
    return (
      <div className="menuPlay">

        <div className="WrapIconBet">
          <ul>
            <div onClick={this.handleClick(0.5)} className={`iconBet ${this.state.chip  == 0.5 ? "active" : ""}`} ><img src={bet0_5} alt=" " /></div>
            <div onClick={this.handleClick(1)}  className={`iconBet ${this.state.chip  == 1 ? "active" : ""}`} ><img src={bet1} alt=" "/></div>
            <div onClick={this.handleClick(2)} className={`iconBet ${this.state.chip  == 2 ? "active" : ""}`} ><img src={bet2} alt=" " /></div>
            <div onClick={this.handleClick(5)} className={`iconBet ${this.state.chip  == 5 ? "active" : ""}`} ><img src={bet5} alt=" " /></div>
            <div onClick={this.handleClick(10)} className={`iconBet ${this.state.chip  == 10 ? "active" : ""}`} ><img src={bet10} alt=" " /></div>
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
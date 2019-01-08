// React core
import React, { Component } from 'react';
import { connect } from 'react-redux';

import bet0_5 from './images/0_5.svg'
import bet1 from './images/1.svg'
import bet2 from './images/2.svg'
import bet5 from './images/5.svg'
import bet10 from './images/10.svg'
import LogoBetAmount from './images/LogoBetAmount.png'

const numbers = [1, 2, 3, 4, 5];

class PlayMenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChoseToken = this.handleChoseToken.bind(this);

    this.state = {
      chip: 0,
      token: 1,
    };
  }
  handleClick = (value) => (e) => {
    this.setState({ chip: value == this.state.chip ? 0 : value });
    this.props.onSelectedChip(value == this.state.chip ? 0 : value);
  };

  handleChoseToken = (value) => (e) => {
    console.log('tam_ handleChoseToken', value);
    this.setState({ token: value })
  }




  render() {
    return (
      <div className="menuPlay">

        <div className="WrapIconBet">
          <ul>
            <div onClick={this.handleClick(0.5)} className={`iconBet ${this.state.chip == 0.5 ? "active" : ""}`} ><img src={bet0_5} alt=" " /></div>
            <div onClick={this.handleClick(1)} className={`iconBet ${this.state.chip == 1 ? "active" : ""}`} ><img src={bet1} alt=" " /></div>
            <div onClick={this.handleClick(2)} className={`iconBet ${this.state.chip == 2 ? "active" : ""}`} ><img src={bet2} alt=" " /></div>
            <div onClick={this.handleClick(5)} className={`iconBet ${this.state.chip == 5 ? "active" : ""}`} ><img src={bet5} alt=" " /></div>
            <div onClick={this.handleClick(10)} className={`iconBet ${this.state.chip == 10 ? "active" : ""}`} ><img src={bet10} alt=" " /></div>
          </ul>
        </div>

        <div className="BetAmount_Wrap" >

          <div className="MenuSelect_Wrap">

            <div className="icon_wrap" onClick={this.handleChoseToken(0)}>
              <div class="menu_playmenu icon_playmenu"></div>
            </div>


            <div className="Dropdown_Wrap">

              <div className={`BetAmount${(this.state.token == 1) || (this.state.token == 0) ? "Show" : "Hidden"}`} onClick={this.handleChoseToken(1)} >
                <img src={LogoBetAmount} alt=" " className="BetAmountLogo" />
                <div className="BetAmountValue"> 5.0</div>
                <div className="BetAmountToken"> EOS</div>
              </div>

              <div className={`BetAmount${(this.state.token == 2) || (this.state.token == 0) ? "Show" : "Hidden"}`} onClick={this.handleChoseToken(2)}>
                <img src={LogoBetAmount} alt=" " className="BetAmountLogo" />
                <div className="BetAmountValue"> 4</div>
                <div className="BetAmountToken"> EOS</div>
              </div>

              <div className={`BetAmount${(this.state.token == 3) || (this.state.token == 0) ? "Show" : "Hidden"}`} onClick={this.handleChoseToken(3)}>
                <img src={LogoBetAmount} alt=" " className="BetAmountLogo" />
                <div className="BetAmountValue"> 3</div>
                <div className="BetAmountToken"> EOS</div>
              </div>

            </div>

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
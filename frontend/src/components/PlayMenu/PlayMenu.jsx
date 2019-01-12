// React core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ApiService } from 'services';

import bet0_5 from './images/0_5.svg'
import bet1 from './images/1.svg'
import bet2 from './images/2.svg'
import bet5 from './images/5.svg'
import bet10 from './images/10.svg'
import EOSLogoBet from './images/LogoBetAmount.png'
import EBTCLogoBet from './images/EBTC.png'

const numbers = [1, 2, 3, 4, 5];

class PlayMenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChosetokenSelect = this.handleChosetokenSelect.bind(this);

    this.state = {
      chip: 0,
      tokenSelect: 1,
      tokenValue: 0,
      net: 0,
      CPU: 0,

    };
  }

  updateNetCpu() {
    // console.log('tam_ updateNetCpu')
    ApiService.hasIdentity().then(rsp => {
      if (rsp) {
        ApiService.GetAccountDetail(rsp.accounts[0].name).then(rawData => {
          // console.log('tam_ playmenu rawData', rawData, rawData.net_limit.available);

          this.setState({
            tokenValue: parseFloat(rawData.core_liquid_balance).toFixed(0),
            net: (rawData.net_limit.used / rawData.net_limit.available * 100).toFixed(0),
            CPU: (rawData.cpu_limit.used / rawData.cpu_limit.available * 100).toFixed(0),
          });
        });
      }
      else {
        this.setState({
          tokenValue: 0,
          net: 0,
          CPU: 0,
        });
      }
    });
  }

  componentDidMount() {
    this.updateNetCpu.bind(this);
    setInterval(this.updateNetCpu.bind(this), 4000);
  }

  handleClick = (value) => (e) => {
    this.setState({ chip: value == this.state.chip ? 0 : value });
    this.props.onSelectedChip(value == this.state.chip ? 0 : value);
  };

  handleChosetokenSelect = (value) => (e) => {
    console.log('tam_ handleChosetokenSelect', value);
    this.setState({ tokenSelect: value })
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

            <button className="showButton_wrap" onClick={this.handleChosetokenSelect(0)}>
              <div class="menu_playmenu icon_playmenu"></div>
            </button>

            <div className="Dropdown_Wrap">

              <div className={`BetAmount${(this.state.tokenSelect == 1) || (this.state.tokenSelect == 0) ? "Show" : "Hidden"}`} onClick={this.handleChosetokenSelect(1)} >
                <img src={EOSLogoBet} alt=" " className="BetAmountLogo" />
                <div className="BetAmountValue">{this.state.tokenValue}</div>
                <div className="BetAmountToken"> EOS</div>
              </div>

              <div className={`BetAmount${(this.state.tokenSelect == 2) || (this.state.tokenSelect == 0) ? "Show" : "Hidden"}`} onClick={this.handleChosetokenSelect(2)}>
                <img src={EBTCLogoBet} alt=" " className="BetAmountLogo" />
                <div className="BetAmountValue"> 4</div>
                <div className="BetAmountToken"> EBTC</div>
              </div>

              <div className={`BetAmount${(this.state.tokenSelect == 3) || (this.state.tokenSelect == 0) ? "Show" : "Hidden"}`} onClick={this.handleChosetokenSelect(3)}>
                <img src={EOSLogoBet} alt=" " className="BetAmountLogo" />
                <div className="BetAmountValue"> 3</div>
                <div className="BetAmountToken"> EOS</div>
              </div>

            </div>
          </div>

          <div className={`info_wrap${this.state.CPU > 70 ? "_over" : ""}`}>
            <div className="info_value">{this.state.CPU} %</div>
            <div className="info_label">CPU</div>
          </div>

          <div className={`info_wrap${this.state.net > 70 ? "_over" : ""}`}>
            <div className="info_value">{this.state.net} %</div>
            <div className="info_label">NET</div>
          </div>


        </div>
      </div>
    );
  }

}

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Export a redux connected component
export default connect(mapStateToProps)(PlayMenu);
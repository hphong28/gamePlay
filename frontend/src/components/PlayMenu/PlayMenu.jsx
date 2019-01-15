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
    this.handleOpenListToken = this.handleOpenListToken.bind(this);

    this.state = {
      chip: 0,
      listtoken: 0,
      tokenSelect: 1,
      EOSTokenValue: "",
      ONETokenValue: "",
      net: 0,
      CPU: 0,

    };
  }

  updateNetCpu() {
    // console.log('tam_ updateNetCpu')
    ApiService.hasIdentity().then(rsp => {
      if (rsp) {
        ApiService.GetAccountDetail(rsp.accounts[0].name).then(rawData => {
          this.setState({
            net: (rawData.net_limit.used / rawData.net_limit.available * 100).toFixed(0),
            CPU: (rawData.cpu_limit.used / rawData.cpu_limit.available * 100).toFixed(0),
          });
        });

        ApiService.GetTokenInfo(rsp.accounts[0].name,"EOS","eosio.token").then(EOSValue =>{
          this.setState({
            EOSTokenValue: EOSValue,
          })
        })
        ApiService.GetTokenInfo(rsp.accounts[0].name,"ONE","onetoken1234").then(ONEValue =>{
          this.setState({
            ONETokenValue: ONEValue,
          })
        })

        console.log('tam_ GetTokenInfo')
      }
      else {
        this.setState({
          EOSTokenValue: "0",
          ONETokenValue: "0",
          net: 0,
          CPU: 0,
        });
      }
    });
  };

  componentDidMount() {
    this.updateNetCpu.bind(this);
    setInterval(this.updateNetCpu.bind(this), 4000);
  };

  handleClick = (value) => (e) => {
    this.setState({ chip: value == this.state.chip ? 0 : value });
    this.props.onSelectedChip(value == this.state.chip ? 0 : value);
  };

  handleChosetokenSelect = (value) => (e) => {
    console.log('tam_ handleChosetokenSelect', value);
    this.setState({ 
      tokenSelect: value,
      listtoken: !this.state.listtoken,
     })
  };

  handleOpenListToken= () => (e) =>{
    console.log('tam_ handleOpenListToken');
    this.setState({ listtoken: !this.state.listtoken });
  };



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

          <div className="MenuSelect_Wrap"  onClick={this.handleOpenListToken()}>


            <div className="Dropdown_Wrap">

              <div className={`BetAmount${(this.state.tokenSelect == 1) || (this.state.listtoken == 1) ? "Show" : "Hidden"}`} onClick={this.handleChosetokenSelect(1)} >
                <img src={EOSLogoBet} alt=" " className="BetAmountLogo" />
                <div className="BetAmountValue">{this.state.EOSTokenValue}</div>
                {/* <div className="BetAmountToken"> EOS</div> */}
                <div class="menu_playmenu icon_playmenu"></div>
              </div>
              

              <div className={`BetAmount${(this.state.tokenSelect == 2) || (this.state.listtoken == 1) ? "Show" : "Hidden"}`} onClick={this.handleChosetokenSelect(2)}>
                <img src={EBTCLogoBet} alt=" " className="BetAmountLogo" />
                <div className="BetAmountValue">{this.state.ONETokenValue}</div>
                {/* <div className="BetAmountToken"> ONE</div> */}
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
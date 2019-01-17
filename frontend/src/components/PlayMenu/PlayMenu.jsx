// React core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ApiService } from 'services';

import bet0_5 from './images/0_5.svg'
import bet1 from './images/1.svg'
import bet2 from './images/2.svg'
import bet5 from './images/5.svg'
import bet10 from './images/10.svg'
import EOSLogo from './images/eos-icon.png'
import OnePlayLogo from './images/oneplay-icon.png'
import dropdown from './images/dropdown.png'

class PlayMenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChosetokenSelect = this.handleChosetokenSelect.bind(this);
    this.handleOpenListToken = this.handleOpenListToken.bind(this);

    this.GetCpuEmergency = this.GetCpuEmergency.bind(this);

    this.state = {
      chip: 0,
      listtoken: 0,
      tokenSelect: 0,
      tokenValue: Array(2).fill(""),
      tokenLogo:[EOSLogo, OnePlayLogo],

      EOSTokenValue: "",
      ONETokenValue: "",
      currentTokenBalance:"",
      currentTokenIcon:EOSLogo,
      net: 0,
      CPU: 0,

    };
  }
  GetCpuEmergency(){
    window.open('https://cpuemergency.com/embed_betdice.html');
  }

  updateNetCpu() {
    // console.log('tam_ updateNetCpu')
    ApiService.hasIdentity().then(rsp => {
      if (rsp) {
        ApiService.GetAccountDetail(rsp.accounts[0].name).then(rawData => {
          rawData?
          this.setState({
            net: (rawData.net_limit.used / rawData.net_limit.available * 100).toFixed(0),
            CPU: (rawData.cpu_limit.used / rawData.cpu_limit.available * 100).toFixed(0),
          }):
          this.setState({
            net: 0,
            CPU: 0,
          })

        });

        ApiService.GetTokenInfo(rsp.accounts[0].name,"EOS","eosio.token").then(EOSValue =>{
          const tmpTokenValue = this.state.tokenValue;
          tmpTokenValue[0] = EOSValue
          this.setState({
            tokenValue: tmpTokenValue,
          })
        })

        ApiService.GetTokenInfo(rsp.accounts[0].name,"ONE","onetoken1234").then(ONEValue =>{
          const tmpTokenValue = this.state.tokenValue;
          tmpTokenValue[1] = ONEValue
          this.setState({
            tokenValue: tmpTokenValue,
          })
        })
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
    // console.log('tam_ handleChosetokenSelect', value);
    this.setState({ 
      tokenSelect: value,
      listtoken: !this.state.listtoken,
     })
  };

  handleOpenListToken= () => (e) =>{
    // console.log('tam_ handleOpenListToken');
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

              <div className={`BetAmountShow`}>
                <img src={this.state.tokenLogo[this.state.tokenSelect]} alt=" " className="BetAmountLogo" />
                <div className="BetAmountValue">{this.state.tokenValue[this.state.tokenSelect]}</div>
                <img src={dropdown} alt=" " className="dropdownicon" />
              </div>
              <div className={`BetAmount${(this.state.listtoken == 1) ? "Show" : "Hidden"}`} onClick={this.handleChosetokenSelect(0)}>
                <img src={this.state.tokenLogo[0]} alt=" " className="BetAmountLogo" />
                <div className="BetAmountValue">{this.state.tokenValue[0]}</div>
                <div  className="dropdownicon" />
              </div>           

              <div className={`BetAmount${(this.state.listtoken == 1) ? "Show" : "Hidden"}`} onClick={this.handleChosetokenSelect(1)}>
                <img src={this.state.tokenLogo[1]} alt=" " className="BetAmountLogo" />
                <div className="BetAmountValue">{this.state.tokenValue[1]}</div>
                <div className="dropdownicon" />
              </div>

          </div>

          <div onClick={this.GetCpuEmergency} className={`info_wrap${this.state.CPU > 70 ? "_over" : ""}`}>
            <div className="info_value">{this.state.CPU} %</div>
            <div className="info_label">CPU</div>
          </div>

          <div onClick={this.GetCpuEmergency} className={`info_wrap${this.state.net > 70 ? "_over" : ""}`}>
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
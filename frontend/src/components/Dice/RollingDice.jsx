import React from 'react';
import './RollingDice.css';
import './DiceNo.css';

import rolling_dice1 from './images/rolling_dice1_md.png'
import rolling_dice2 from './images/rolling_dice2_md.png'
import rolling_dice3 from './images/rolling_dice3_md.png'

class RollingDice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            timeout: 0,
            rolling: 0,
            msg: "start betting..."
        };
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.systemTick = this.systemTick.bind(this);
    }
    componentDidMount() {
        if ((this.props.counttimer > 0) && (this.props.counttimer < 999)) {
            this.setState({ time: this.props.counttimer, timeout: 0 })
            this.startTimer(1000);
        }
    }
    systemTick() {
        this.setState({
            time: this.state.time - 1
        })
        if (this.state.time === 0) {
            this.stopTimer();
            this.startTimer(100)
            this.setState({
                timeout: 1,
                msg: "wait result..."
            })
        }
        if (this.state.rolling === 50) {
            this.stopTimer();
            this.setState({
                timeout: 2,
                msg: "waiting for next round..."
            })
        }

        if (this.state.timeout === 1) {
            this.setState({
                rolling: this.state.rolling + 1
            })
        }
    }
    startTimer(timer) {
        this.timer = setInterval(this.systemTick, timer)
    }
    stopTimer() {
        clearInterval(this.timer)
    }

    format(time) {
        let seconds = time % 60;
        let minutes = Math.floor(time / 60);
        minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
        seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
        return minutes + ':' + seconds;
      }

    render() {
        return (
            <div className="dice_header">
            <div className="result">
                <div className={`countdown ${this.state.timeout  == 0 ? "active" : ""}`}>{this.format(this.state.time)}</div>
                <div className={`dice_rolling ${this.state.timeout == 1 ? "active" : ""}`}>
                    <div className={`item ${this.state.rolling % 3 == 0 ? "active" : ""}`}><img src={rolling_dice1} alt={"rolling-dice-1"}></img></div>
                    <div className={`item ${this.state.rolling % 3 == 1 ? "active" : ""}`}><img src={rolling_dice2} alt={"rolling-dice-2"}></img></div>
                    <div className={`item ${this.state.rolling % 3 == 2 ? "active" : ""}`}><img src={rolling_dice3} alt={"rolling-dice-3"}></img></div>
                </div>
                <div className={`dice_result ${this.state.timeout == 2 ? " active" : ""}`}>
                    <div className={`dice_md_item ${"dice_md_num" + this.props.dice1}`} ></div>
                    <div className={`dice_md_item ${"dice_md_num" + this.props.dice2}`} ></div>
                    <div className={`dice_md_item ${"dice_md_num" + this.props.dice3}`} ></div>
                </div>
                <div className="bet_msg">
             {this.state.msg}
             </div>
            </div>

             </div>
        );
    }
}

export default RollingDice;
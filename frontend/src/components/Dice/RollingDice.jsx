import React from 'react';
import './RollingDice.css';
import './DiceNo.css';

import rolling_dice1 from './images/rolling_dice_md_1.png'
import rolling_dice2 from './images/rolling_dice_md_2.png'
import rolling_dice3 from './images/rolling_dice_md_3.png'

class RollingDice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            timeout: 0,
            rolling: 0
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
                timeout: 1
            })
        }
        if (this.state.rolling === 50) {
            this.stopTimer();
            this.setState({
                timeout: 2
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

    render() {
        if ((this.props.phase === 0) && (this.state.timeout === 0)) {
            return (
                <div class="countdown">{this.state.time}</div>
            );
        } else if (this.state.timeout === 1) {
            return (
                <div class="radom">
                    <div className={`item ${this.state.rolling % 3 == 0 ? " active" : ""}`}><img src={rolling_dice1} alt={"rolling-dice-1"}></img></div>
                    <div className={`item ${this.state.rolling % 3 == 1 ? " active" : ""}`}><img src={rolling_dice2} alt={"rolling-dice-2"}></img></div>
                    <div className={`item ${this.state.rolling % 3 == 2 ? " active" : ""}`}><img src={rolling_dice3} alt={"rolling-dice-3"}></img></div>
                </div>

            );
        } else if (this.state.timeout === 2) {
            return (
                <div className="dice_result">
                    <div className={`dice_md_item ${"dice_md_num" + this.props.dice1}`} ></div>
                    <div className={`dice_md_item ${"dice_md_num" + this.props.dice2}`} ></div>
                    <div className={`dice_md_item ${"dice_md_num" + this.props.dice3}`} ></div>
                </div>
            );
        }
    }
}

export default RollingDice;
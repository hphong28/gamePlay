import React from 'react';
import './Dice.css';
import './DiceNo.css';
import './DiceCase.css';
class DiceCase extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //   value: null,
        // };
    }

    render() {
        if (this.props.type === 1) {
            return (
                <div className="case_threedice">
                    <div className={`dice_sm_item ${"dice_sm_num" + this.props.dice1}`} ></div>
                    <div className={`dice_sm_item ${"dice_sm_num" + this.props.dice2}`} ></div>
                    <div className={`dice_sm_item ${"dice_sm_num" + this.props.dice3}`} ></div>
                </div>

            );
        } else if (this.props.type === 2) {
            return (
                <div className="case_number">
                    {this.props.value <= 10 ? <div className="dice_num_top">{this.props.value}</div> : <div className="dice_num_bottom">{this.props.value}</div>}
                </div>
            );
        } else if (this.props.type === 3) {
            return (
                <div className="case_single">
                    <div className={`dice_sm_item ${"dice_sm_num" + this.props.value}`} ></div>
                </div>
            );
        } else if (this.props.type === 4) {
            return (
                <div className="case_bigsmall">
                    {this.props.value <= 10 ? <div className="dice_small">SMALL</div> : <div className="dice_big">BIG</div>}
                </div>
            );
        }
    }
}

export default DiceCase;
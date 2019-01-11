import React from 'react';
import './Dice.css';
import './DiceNo.css';
class Dice extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        // this.state = {
        //   value: null,
        // };
    }
    handleClick() {
        console.log("quoc handleClick");
        this.props.onBetClick();
      };
    render() {
        if (this.props.type === 1) {
            return (
                <div className="dice_group1">
                    <div className={`dice_md_item ${"dice_md_num" + this.props.value}`} ></div>
                    <div className="desc" ><p>Total Bet: 0.0000 EOS</p><p> My Bet: {this.props.betVal[this.props.index]} EOS</p></div>
                    <div className={`bet ${this.props.betVal[this.props.index] >0 ? "active":""}`} ><button class="btn" onClick ={this.handleClick}>Bet</button></div>

                </div>

            );
        } else if (this.props.type === 2) {
            return (
                <div className="dice_group2">
                    {this.props.value <= 10 ? <div className="dice_num_top">{this.props.value}</div> : <div className="dice_num_bottom">{this.props.value}</div>}
                    <div className="dice_rate">1:{this.props.rate}</div>
                    <div className="desc" ><p>Total Bet: 0.0000 EOS</p><p> My Bet: {this.props.betVal[this.props.index]} EOS</p></div>
                    <div className={`bet ${this.props.betVal[this.props.index] >0 ? "active":""}`} ><button class="btn" onClick ={this.handleClick}>Bet</button></div>

                </div>
            );
        } else if (this.props.type === 3) {
            return (
                <div className="dice_group3">
                    <div className="dice_group3_border">
                        <div className="center">
                            <div className={`dice_sm_item ${"dice_sm_num" + this.props.value}`} ></div>
                        </div>
                        <div className={`dice_sm_item ${"dice_sm_num" + this.props.value}`} ></div>
                        <div className={`dice_sm_item ${"dice_sm_num" + this.props.value}`} ></div>
                        <div className="desc" ><p>Total Bet: 0.0000 EOS</p><p> My Bet: {this.props.betVal[this.props.index]} EOS</p></div>
                        <div className={`bet ${this.props.betVal[this.props.index] >0 ? "active":""}`} ><button class="btn" onClick ={this.handleClick}>Bet</button></div>
                    </div>
                    <div className="dice_rate">1:{this.props.rate}</div>
                </div>
            );
        } else if (this.props.type === 4) {
            return (
                <div className="dice_group4">
                    {this.props.value ? <div className="dice_name_small">SMALL</div> : <div className="dice_name_big">BIG</div>}
                    <div className="dice_num_2" >{this.props.value ? "4-10" : "11-17"}</div>
                    <div className="dice_rate">1:{this.props.rate}</div>
                    <div className="desc" ><p>Total Bet: 0.0000 EOS</p><p> My Bet: {this.props.betVal[this.props.index]} EOS</p></div>
                    <div className={`bet ${this.props.betVal[this.props.index] >0 ? "active":""}`} ><button class="btn" onClick ={this.handleClick}>Bet</button></div>

                </div>
            );
        }
    }
}

export default Dice;
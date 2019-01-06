
import React from 'react';

import Dice from 'components/Dice/Dice.jsx'
import { PlayMenu } from 'components';

import './DiceBoard.css';
import RollingDice from 'components/Dice/RollingDice.jsx';

class DiceBoard extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleSelectedChip = this.handleSelectedChip.bind(this);
        this.state = {
            selectedChip: 0,
            betCase: "",
            betVal: 0,
        };
    }

    handleClick = (value) => (e) => {
        this.setState({
            betVal: value == this.state.betCase ? this.state.selectedChip + this.state.betVal : this.state.selectedChip,
            betCase: value
        });
    };

    handleSelectedChip(value) {
        this.setState({
            selectedChip: value
        });
    };

    renderSquare(i, type, value, rate, betValue) {
        return (
            <Dice
                type={type}
                value={value}
                rate={rate}
                betVal={betValue}
                onClick={() => this.handleClick(i)}
            />

        );
    }

    render() {
        const dice = {
            countDown: true,
            time2dice: 1,
            numberOfDices: 3,

            dice1timer: "4s",
            dice1value: 1,

            dice2timer: "3s",
            dice2value: 3,

            dice3timer: "2s",
            dice3value: 4
        };
        return (
            <div className="DiceBoard">
                        {console.log("selectedChip",this.state.selectedChip +"betCase",this.state.betCase +"betVal",this.state.betVal)}

                <div className="DiceBoardRow1">
                    <div className="board-row">
                        <div className="group1" onClick={this.handleClick("TRIPLE_1")}>
                            {this.renderSquare(0, 3, 1, 150, this.state.betVal)}
                        </div>
                        <div className="group1" onClick={this.handleClick("TRIPLE_2")}>
                            {this.renderSquare(1, 3, 2, 150, this.state.betVal)}
                        </div>
                        <div className="group1" onClick={this.handleClick("TRIPLE_3")}>
                            {this.renderSquare(2, 3, 3, 150, this.state.betVal)}
                        </div>
                        <div className="ThreeDice">
                            <RollingDice
                                phase={0}
                                counttimer={12}
                                dice1={1}
                                dice2={5}
                                dice3={3}
                            />
                        </div>
                        <div className="group1" onClick={this.handleClick("TRIPLE_4")}>
                            {this.renderSquare(3, 3, 4, 150, this.state.betVal)}
                        </div>
                        <div className="group1" onClick={this.handleClick("TRIPLE_5")}>
                            {this.renderSquare(4, 3, 5, 150, this.state.betVal)}
                        </div>
                        <div className="group1" onClick={this.handleClick("TRIPLE_6")}>
                            {this.renderSquare(5, 3, 6, 150, this.state.betVal)}
                        </div>
                    </div>
                </div>
                <div className="DiceBoardRow2" onClick={this.handleClick("BIG")} >
                    <div className="DiceBoardRow2Col">
                        {this.renderSquare(26, 4, 0, 1, this.state.betVal)}
                    </div>
                    <div className="DiceBoardRow2ColMid">
                        <div className="board-row2">
                            <div className="group2" onClick={this.handleClick("NUM_4")} >
                                {this.renderSquare(6, 2, 4, 6, this.state.betVal)}
                            </div>
                            <div className="group2" onClick={this.handleClick("NUM_5")}>
                                {this.renderSquare(7, 2, 5, 6, this.state.betVal)}
                            </div>
                            <div className="group2" onClick={this.handleClick("NUM_6")}>
                                {this.renderSquare(8, 2, 6, 6, this.state.betVal)}
                            </div>
                            <div className="group2" onClick={this.handleClick("NUM_7")}>
                                {this.renderSquare(9, 2, 7, 6, this.state.betVal)}
                            </div>
                            <div className="group2" onClick={this.handleClick("NUM_8")}>
                                {this.renderSquare(10, 2, 8, 6, this.state.betVal)}
                            </div>
                            <div className="group2" onClick={this.handleClick("NUM_9")}>
                                {this.renderSquare(11, 2, 9, 6, this.state.betVal)}
                            </div>
                            <div className="group2" onClick={this.handleClick("NUM_10")}>
                                {this.renderSquare(12, 2, 10, 6, this.state.betVal)}
                            </div>
                        </div>
                        <div className="board-row3">
                            <div className="group2" onClick={this.handleClick("NUM_11")}>
                                {this.renderSquare(13, 2, 11, 6, this.state.betVal)}
                            </div>
                            <div className="group2" onClick={this.handleClick("NUM_12")}>
                                {this.renderSquare(14, 2, 12, 6, this.state.betVal)}
                            </div>
                            <div className="group2" onClick={this.handleClick("NUM_13")}>
                                {this.renderSquare(15, 2, 13, 6, this.state.betVal)}
                            </div>
                            <div className="group2" onClick={this.handleClick("NUM_14")}>
                                {this.renderSquare(16, 2, 14, 6, this.state.betVal)}
                            </div>
                            <div className="group2" onClick={this.handleClick("NUM_15")}>
                                {this.renderSquare(17, 2, 15, 6, this.state.betVal)}
                            </div>
                            <div className="group2" onClick={this.handleClick("NUM_16")}>
                                {this.renderSquare(18, 2, 16, 6, this.state.betVal)}
                            </div>
                            <div className="group2" onClick={this.handleClick("NUM_17")}>
                                {this.renderSquare(19, 2, 17, 6, this.state.betVal)}
                            </div>
                        </div>
                    </div>
                    <div className="DiceBoardRow2Col" onClick={this.handleClick("SMALL")} >
                        {this.renderSquare(27, 4, 1, 1, this.state.betVal)}
                    </div>
                </div>
                <div className="DiceBoardRow3">
                    <div className="group4" onClick={this.handleClick("SINGLE_1")}>
                        {this.renderSquare(20, 1, 1, 6, this.state.betVal)}
                    </div>
                    <div className="group4" onClick={this.handleClick("SINGLE_2")}>
                        {this.renderSquare(21, 1, 2, 6, this.state.betVal)}
                    </div>
                    <div className="group4" onClick={this.handleClick("SINGLE_3")}>
                        {this.renderSquare(22, 1, 3, 6, this.state.betVal)}
                    </div>
                    <div className="group4" onClick={this.handleClick("SINGLE_4")}>
                        {this.renderSquare(23, 1, 4, 6, this.state.betVal)}
                    </div>
                    <div className="group4" onClick={this.handleClick("SINGLE_5")}>
                        {this.renderSquare(24, 1, 5, 6, this.state.betVal)}
                    </div>
                    <div className="group4" onClick={this.handleClick("SINGLE_6")}>
                        {this.renderSquare(25, 1, 6, 6, this.state.betVal)}
                    </div>
                </div>

                <PlayMenu  onSelectedChip={this.handleSelectedChip}/>

            </div>
        );
    }
}

export default DiceBoard;

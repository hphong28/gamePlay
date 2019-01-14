
import React from 'react';

import Dice from 'components/Dice/Dice.jsx'
import { PlayMenu } from 'components';

import './DiceBoard.css';
import RollingDice from 'components/Dice/RollingDice.jsx';
import { ApiService } from 'services';

class DiceBoard extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectedBet = this.handleSelectedBet.bind(this);
        this.handleSelectedChip = this.handleSelectedChip.bind(this);
        this.handleBetClick = this.handleBetClick.bind(this);
        this.state = {
            selectedChip: 0,
            selectedBetCase: "",
            betVal: 0,
            betCaseArray: ["TRIPLE_1", "TRIPLE_2", "TRIPLE_3", "TRIPLE_4", "TRIPLE_5", "TRIPLE_6", "NUM_4", "NUM_5", "NUM_6", "NUM_7", "NUM_8",  "NUM_9", "NUM_10", "NUM_11", "NUM_12", "NUM_13", "NUM_14", "NUM_15", "NUM_16", "NUM_17", "SINGLE_1", "SINGLE_2", "SINGLE_3", "SINGLE_4", "SINGLE_5", "SINGLE_6", "BIG", "SMALL", "EVEN", "OLD"],
            betValArray: Array(30).fill(0),
        };
    }

    handleSelectedBet = (value) => (e) => {
        const betVals = Array(30).fill(0);
        betVals[value] = this.state.betValArray[value] + this.state.selectedChip;
        this.setState({
            selectedBetCase: this.state.betCaseArray[value],
            betValArray: betVals,
            betVal: betVals[value],
        });
    };

    handleSelectedChip(value) {
        this.setState({
            selectedChip: value
        });
    };
    handleBetClick() {
        console.log("handleBetClick")
        ApiService.startBet("ilovedice123", this.state.selectedBetCase, this.state.betVal, "");

    };
    renderSquare(i, type, value, rate, betValue) {
        return (
            <Dice
                index = {i}
                type={type}
                value={value}
                rate={rate}
                betVal={betValue}
                onClick={() => this.handleClick(i)}
                onBetClick={() =>this.handleBetClick()}
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
            {console.log(this.state.betValArray)}
                <div className="DiceBoardRow1">
                    <div className="board-row">
                        <div className="group1" onClick={this.handleSelectedBet(0)}>
                            {this.renderSquare(0, 3, 1, 150, this.state.betValArray)}
                        </div>
                        <div className="group1" onClick={this.handleSelectedBet(1)}>
                            {this.renderSquare(1, 3, 2, 150, this.state.betValArray)}
                        </div>
                        <div className="group1" onClick={this.handleSelectedBet(2)}>
                            {this.renderSquare(2, 3, 3, 150, this.state.betValArray)}
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
                        <div className="group1" onClick={this.handleSelectedBet(3)}>
                            {this.renderSquare(3, 3, 4, 150, this.state.betValArray)}
                        </div>
                        <div className="group1" onClick={this.handleSelectedBet(4)}>
                            {this.renderSquare(4, 3, 5, 150, this.state.betValArray)}
                        </div>
                        <div className="group1" onClick={this.handleSelectedBet(5)}>
                            {this.renderSquare(5, 3, 6, 150, this.state.betValArray)}
                        </div>
                    </div>
                </div>
                <div className="DiceBoardRow2">
                    <div className="DiceBoardRow2Col" onClick={this.handleSelectedBet(26)}>
                        {this.renderSquare(26, 4, 0, 1, this.state.betValArray)}
                    </div>
                    <div className="DiceBoardRow2ColMid">
                        <div className="board-row2">
                            <div className="group2" onClick={this.handleSelectedBet(6)} >
                                {this.renderSquare(6, 2, 4, 6, this.state.betValArray)}
                            </div>
                            <div className="group2" onClick={this.handleSelectedBet(7)}>
                                {this.renderSquare(7, 2, 5, 6, this.state.betValArray)}
                            </div>
                            <div className="group2" onClick={this.handleSelectedBet(8)}>
                                {this.renderSquare(8, 2, 6, 6, this.state.betValArray)}
                            </div>
                            <div className="group2" onClick={this.handleSelectedBet(9)}>
                                {this.renderSquare(9, 2, 7, 6, this.state.betValArray)}
                            </div>
                            <div className="group2" onClick={this.handleSelectedBet(10)}>
                                {this.renderSquare(10, 2, 8, 6, this.state.betValArray)}
                            </div>
                            <div className="group2" onClick={this.handleSelectedBet(11)}>
                                {this.renderSquare(11, 2, 9, 6, this.state.betValArray)}
                            </div>
                            <div className="group2" onClick={this.handleSelectedBet(12)}>
                                {this.renderSquare(12, 2, 10, 6, this.state.betValArray)}
                            </div>
                        </div>
                        <div className="board-row3">
                            <div className="group2" onClick={this.handleSelectedBet(13)}>
                                {this.renderSquare(13, 2, 11, 6, this.state.betValArray)}
                            </div>
                            <div className="group2" onClick={this.handleSelectedBet(14)}>
                                {this.renderSquare(14, 2, 12, 6, this.state.betValArray)}
                            </div>
                            <div className="group2" onClick={this.handleSelectedBet(15)}>
                                {this.renderSquare(15, 2, 13, 6, this.state.betValArray)}
                            </div>
                            <div className="group2" onClick={this.handleSelectedBet(16)}>
                                {this.renderSquare(16, 2, 14, 6, this.state.betValArray)}
                            </div>
                            <div className="group2" onClick={this.handleSelectedBet(17)}>
                                {this.renderSquare(17, 2, 15, 6, this.state.betValArray)}
                            </div>
                            <div className="group2" onClick={this.handleSelectedBet(18)}>
                                {this.renderSquare(18, 2, 16, 6, this.state.betValArray)}
                            </div>
                            <div className="group2" onClick={this.handleSelectedBet(19)}>
                                {this.renderSquare(19, 2, 17, 6, this.state.betValArray)}
                            </div>
                        </div>
                    </div>
                    <div className="DiceBoardRow2Col" onClick={this.handleSelectedBet(27)} >
                        {this.renderSquare(27, 4, 1, 1, this.state.betValArray)}
                    </div>
                </div>
                <div className="DiceBoardRow3">
                    <div className="group4" onClick={this.handleSelectedBet(20)}>
                        {this.renderSquare(20, 1, 1, 6, this.state.betValArray)}
                    </div>
                    <div className="group4" onClick={this.handleSelectedBet(21)}>
                        {this.renderSquare(21, 1, 2, 6, this.state.betValArray)}
                    </div>
                    <div className="group4" onClick={this.handleSelectedBet(22)}>
                        {this.renderSquare(22, 1, 3, 6, this.state.betValArray)}
                    </div>
                    <div className="group4" onClick={this.handleSelectedBet(23)}>
                        {this.renderSquare(23, 1, 4, 6, this.state.betValArray)}
                    </div>
                    <div className="group4" onClick={this.handleSelectedBet(24)}>
                        {this.renderSquare(24, 1, 5, 6, this.state.betValArray)}
                    </div>
                    <div className="group4" onClick={this.handleSelectedBet(25)}>
                        {this.renderSquare(25, 1, 6, 6, this.state.betValArray)}
                    </div>
                </div>

                <PlayMenu onSelectedChip={this.handleSelectedChip} />

            </div>
        );
    }
}

export default DiceBoard;

// React core
import React, { Component } from 'react';
import { connect } from 'react-redux';

import GiftImage from './images/gift.svg'

class GiftDaily extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CloseDialogue: false,
        }

        this.clickOutside = this.clickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
    }
    clickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            console.log('tam_ clickOutside');
            this.props.onGiftDaily();
        }
    }
    componentDidMount() {
        document.addEventListener('click', this.clickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.clickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }


    render() {
        return (
            <div className="GiftDailyWrap" >
                <div className="GiftDailyCss" ref={this.setWrapperRef}>
                    <div>
                        <a href="#" onClick={this.props.onGiftDaily} class="CloseButtonGift"></a>
                    </div>

                    <div className="HeaderGift">
                        Daily Gift
                    </div>

                    <div className="wrap_gift_image">
                        <img src={GiftImage} alt=" " className="DailyGiftImage" />
                    </div>

                    <div className="wrap_detail">
                        Get Your Gift EveryDay
                    </div>

                    <div className="wrap_button_claim">
                        <button className="button_claim">CLAIM</button>
                    </div>

                </div>
            </div>
        )
    }
}



// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Export a redux connected component
export default connect(mapStateToProps)(GiftDaily);
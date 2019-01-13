// React core
import React, { Component } from 'react';
import { connect } from 'react-redux';

class HowToPlay extends Component {
    constructor(props) {
        super(props);

        this.clickOutside = this.clickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
    }
    clickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            console.log('tam_ clickOutside');
            this.props.onCloseHowToPlay();
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
            <div className="HowToPlayWrap">
                <div className="HowToPlayStyle" ref={this.setWrapperRef}>
                    <div>
                        <a href="#" onClick={this.props.onCloseHowToPlay} class="CloseButtonHowToPlay"></a>
                    </div>
                    <div className="HeaderHowToPlay">
                        How To Play
                    </div>

                    <div className="DetailHowToPlay">
                        <p>1, Prepare your EOS account.<br /></p>

                        <p className="OneLineCss">2, If you didn't install Scatter yet, please follow this<br /></p>
                        <p><a href="https://get-scatter.com/">Install Scatter</a> to install Scatter<br /></p>

                        <p className="OneLineCss">3, Press the login button to login through Scatter.<br /></p>

                        <p className="OneLineCss">4, Choose your betting currency, you can bet with<br /></p>
                        <p>EOS or ONE token.<br /></p>

                        <p className="OneLineCss">5, Select your bet amount.<br /></p>

                        <p className="OneLineCss">6, Choose all case before opening dice<br /></p>

                        <p className="OneLineCss">7, Click 'Play' to bet.<br /></p>
                    </div>
                </div>
            </div>
        )
    }
}


// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Export a redux connected component
export default connect(mapStateToProps)(HowToPlay);
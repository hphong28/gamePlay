// React core
import React, { Component } from 'react';
import { connect } from 'react-redux';

class GiftDaily extends Component {
    render() {
        return (
            <div className="GiftDailyWrap">
                <div className="GiftDailyCss">
                    <div>
                        <a href="#" onClick={this.props.onGiftDaily} class="CloseButtonGift"></a>
                    </div>

                    <div className="HeaderGift">
                    Lien He Quoc Le Lay Qua

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
// React core
import React, { Component } from 'react';
import { connect } from 'react-redux';


class PlayMenu extends Component {

  render() {

    return (
      <div className="PlayMenu">
      slkdjflksjdflksj

      </div>
    );
  }

}

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Export a redux connected component
export default connect(mapStateToProps)(PlayMenu);
import styles from './App.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { accessibleContrast } from 'utils/accessibility/accessibility';
import { contrast } from 'utils/color/color';
import Header from 'Header/Header';
import UserInput from 'UserInput/UserInput';
import AccessibilityIndicator from 'AccessibilityIndicator/AccessibilityIndicator';
import UserInputError from 'UserInputError/UserInputError';
import Preview from 'Preview/Preview';
import Footer from 'Footer/Footer';

function mapStateToProps(state) {
  return {
    textColor: state.textColor,
    fontSize: state.fontSize,
    isFontBold: state.isFontBold,
    backgroundColor: state.backgroundColor,
    accessibilityLevel: state.accessibilityLevel
  };
}

class App extends Component {
  static propTypes = {
    textColor: PropTypes.object.isRequired,
    fontSize: PropTypes.object.isRequired,
    isFontBold: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.object.isRequired,
    accessibilityLevel: PropTypes.string.isRequired
  };

  render() {
    const { textColor, fontSize, isFontBold,
            backgroundColor, accessibilityLevel } = this.props;
    const isUserInputValid =
      textColor.isValueValid && fontSize.isValid && backgroundColor.isValueValid;
    const accessibleContrastRatio = isUserInputValid ?
      accessibleContrast(accessibilityLevel, parseInt(fontSize.value, 10), isFontBold) : null;
    const isAccessible = isUserInputValid ?
      (contrast(textColor.value, backgroundColor.value) >= accessibleContrastRatio) : null;

    return (
      <div className={styles.container}>
        <Header />
        <UserInput />
        {isUserInputValid && <AccessibilityIndicator isAccessible={isAccessible} />}
        {isUserInputValid && <Preview accessibleContrast={accessibleContrastRatio} />}
        {!isUserInputValid && <UserInputError />}
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);

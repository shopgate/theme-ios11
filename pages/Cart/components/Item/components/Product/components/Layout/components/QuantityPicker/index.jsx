import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { i18n, isNumeric } from '@shopgate/engage/core';
import style from './style';

/**
 * The Quantity Picker component.
 */
class QuantityPicker extends Component {
  static propTypes = {
    editMode: PropTypes.bool,
    onChange: PropTypes.func,
    onToggleEditMode: PropTypes.func,
    quantity: PropTypes.number,
  };

  static defaultProps = {
    editMode: false,
    onChange: () => { },
    quantity: 1,
    onToggleEditMode: () => { },
  };

  /**
   * Constructor.
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    this.regex = /^([0-9]{0,4})$/;

    this.state = {
      quantity: this.initialQuantity,
    };
  }

  /**
   * Called after mount. Focuses the input if the edit mode is active.
   */
  componentDidMount() {
    if (this.props.editMode) {
      this.input.focus();
    }

    /**
     * Prevent the opening of the context menu when this
     * input is focused and the value is selected.
     */
    this.input.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      event.stopPropagation();
      return false;
    });
  }

  /**
   * The componentWillReceiveProps lifecycle hook. I will bring the input into the correct state.
   * @param {Object} nextProps The next set of props.
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.editMode) {
      this.input.focus();
    } else {
      this.input.blur();
    }

    if (nextProps.quantity && this.props.quantity !== nextProps.quantity) {
      this.updateQuantityInState(nextProps.quantity);
    }
  }

  /**
   * Only update when certain state changes are made.
   * @param {Object} nextProps The next set of props.
   * @param {Object} nextState The next component state.
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.quantity !== nextState.quality;
  }

  /**
   * The default quantity.
   * @type {number}
   */
  defaultQuantity = 1;

  /**
   * Returns the initial quantity based on the props.
   * If the props are set to 0 or lower, it will fall back to 1.
   * @return {number}
   */
  get initialQuantity() {
    if (this.props.quantity === 0 || this.props.quantity < this.defaultQuantity) {
      return this.defaultQuantity;
    }

    return this.props.quantity;
  }

  /**
   * Sets the comoponent ref.
   * @param {HTMLElement} input The input field ref.
   */
  setRef = (input) => {
    this.input = input;
  };

  /**
   * Event handler for the onChange event of the input.
   * @param {Object} event The event object.
   */
  handleInputChange = (event) => {
    const prevQuantity = this.state.quantity;
    let nextQuantity = event.target.value;

    if (this.regex.test(nextQuantity) === false) {
      // Reset the invalid value to the previous
      nextQuantity = prevQuantity;
    }

    // Update the quantity state with the new input.
    this.updateQuantityInState(nextQuantity);
  };

  /**
   * Event handler for the onClick event of the input.
   * @param {Object} event The event object.
   */
  handleInputClick = (event) => {
    // Prevent the native focus event ...
    event.stopPropagation();
    event.preventDefault();

    // ... and trigger it manually.
    // This way we avoid the select actions (copy, paste, cut) to become visible.
    this.input.blur();
    this.props.onToggleEditMode(true);
  };

  /**
   * Event handler for the onFocus event of the input.
   */
  handleInputFocus = () => {
    this.input.select();
    this.props.onToggleEditMode(true);
  };

  /**
   * Event handler for the onSubmit event of the form which wraps the input.
   * @param {Object} event The event object.
   */
  handleSubmitForm = (event) => {
    event.preventDefault();
    this.input.blur();
  };

  /**
   * Event handler for the onBlur event of the input.
   * @param {Object} event The event object.
   */
  handleInputBlur = (event) => {
    /**
     * Performs the actual logic to handle the blur event of the input.
     */
    const handleBlur = () => {
      // Deactivate the edit mode
      this.props.onToggleEditMode(false);

      if (this.props.quantity !== this.state.quantity) {
        this.props.onChange(parseInt(this.state.quantity, 10));
      }
    };

    if (!event.target.value) {
      // Set the quantity state back to default, if the value of the input is invalid.
      this.updateQuantityInState(this.defaultQuantity, handleBlur);
    } else {
      handleBlur();
    }
  };

  /**
   * Updates the quantity within the component state. It takes care,
   * that the state quantity is always a numeric value.
   * @param {string|number} quantity The new quantity
   * @param {Function} [callback] Callback for the setState call.
   */
  updateQuantityInState(quantity, callback = () => { }) {
    const sanitizedQuantity = isNumeric(quantity) ? parseInt(quantity, 10) : '';

    this.setState({
      quantity: sanitizedQuantity,
    }, callback);
  }

  /**
   * Renders the component.
   * @return {JSX}
   */
  render() {
    return (
      <form onSubmit={this.handleSubmitForm} className="theme__cart__product__quantity-picker">
        <input
          ref={this.setRef}
          type="number"
          pattern="[0-9]*"
          className={style}
          value={this.state.quantity}
          onChange={this.handleInputChange}
          onClick={this.handleInputClick}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          min={0}
          data-test-id="quantityPicker"
          aria-label={i18n.text('product.quantity')}
        />
      </form>
    );
  }
}

export default QuantityPicker;

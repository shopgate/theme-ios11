import { connect } from 'react-redux';
import setSearchSuggestionsPhrase from '@shopgate/pwa-common-commerce/search/action-creators/setSearchSuggestionsPhrase';
import { getSearchSuggestionsPhrase } from '@shopgate/pwa-common-commerce/search/selectors';
import submitSearch from './actions/submitSearch';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  searchPhrase: getSearchSuggestionsPhrase(state) || '',
});

/**
 * Maps action dispatchers to the component props.
 * @param {function} dispatch The store dispatcher.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  setSearchPhrase: query => dispatch(setSearchSuggestionsPhrase(query)),
  submitSearch: () => dispatch(submitSearch()),
});

/**
 * Connects a component to the store.
 * @param {Object} Component A react component.
 * @return {Object} The react component with extended props.
 */
export default connect(mapStateToProps, mapDispatchToProps);

import React, {
  useState, useMemo, memo, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useWidgetSettings } from '@shopgate/engage/core';
import { ScrollHeader, SurroundPortals } from '@shopgate/engage/components';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import Content from './components/Content';
import styles from './style';

const { colors, variables: { scroll: { offset = 100 } = {} } } = themeConfig || {};

/**
 * The FilterBar component.
 * @param {Object} props The component props.
 * @returns {JSX}
 */
function FilterBar({ filters }) {
  const { hideOnScroll } = useWidgetSettings('@shopgate/engage/components/FilterBar');
  const [active, setActive] = useState(filters !== null && Object.keys(filters).length > 0);

  const handleChipCountUpdate = useCallback((count) => {
    setActive(count > 0);
  }, []);

  const style = useMemo(() => ({
    background: active ? colors.accent : colors.background,
    color: active ? colors.accentContrast : colors.dark,
  }), [active]);

  return (
    <ScrollHeader hideOnScroll={hideOnScroll} scrollOffset={offset}>
      <div className={`${styles} theme__filter-bar`} data-test-id="filterBar" style={style}>
        <SurroundPortals portalName="filter-bar.content">
          <Content onChipCountUpdate={handleChipCountUpdate} />
        </SurroundPortals>
      </div>
    </ScrollHeader>
  );
}

FilterBar.propTypes = {
  filters: PropTypes.shape(),
};

FilterBar.defaultProps = {
  filters: null,
};

export default memo(FilterBar);

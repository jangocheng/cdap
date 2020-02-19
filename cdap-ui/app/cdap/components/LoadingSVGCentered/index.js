/*
 * Copyright © 2017 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

import PropTypes from 'prop-types';
import React from 'react';
import LoadingSVG from 'components/LoadingSVG';
import classname from 'classnames';

require('./LoadingSVGCentered.scss');

export default function LoadingSVGCentered({ showFullPage = false }) {
  return (
    <div
      className={classname('loading-svg-centered text-center', {
        'full-page': showFullPage,
      })}
    >
      <LoadingSVG />
    </div>
  );
}

LoadingSVGCentered.propTypes = {
  showFullPage: PropTypes.bool,
};

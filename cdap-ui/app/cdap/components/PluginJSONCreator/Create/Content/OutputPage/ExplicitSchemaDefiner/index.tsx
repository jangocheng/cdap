/*
 * Copyright © 2020 Cask Data, Inc.
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

import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import { useOutputState } from 'components/PluginJSONCreator/Create';
import PluginInput from 'components/PluginJSONCreator/Create/Content/PluginInput';
import { SCHEMA_TYPES } from 'components/SchemaEditor/SchemaHelpers';
import * as React from 'react';

const styles = (): StyleRules => {
  return {
    outputInput: {
      marginTop: '30px',
      marginBottom: '30px',
    },
  };
};

const SCHEMA_TYPES_DELIMITER = ',';

const ExplicitSchemaDefinerView: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
  const {
    outputName,
    setOutputName,
    schemaTypes,
    setSchemaTypes,
    schemaDefaultType,
    setSchemaDefaultType,
  } = useOutputState();

  const onSchemaTypesChange = (val) => {
    setSchemaTypes(val.split(SCHEMA_TYPES_DELIMITER));
  };

  return (
    <div>
      <div className={classes.outputInput}>
        <PluginInput
          widgetType={'textbox'}
          value={outputName}
          onChange={setOutputName}
          label={'Output Name'}
          placeholder={'output name'}
        />
      </div>
      <div className={classes.outputInput}>
        <PluginInput
          widgetType={'multi-select'}
          onChange={onSchemaTypesChange}
          label={'Schema Types'}
          delimiter={SCHEMA_TYPES_DELIMITER}
          // options={SCHEMA_TYPES.types.map((type) => ({ id: type, label: type }))}
          options={SCHEMA_TYPES.types}
          value={schemaTypes}
        />
      </div>
      <div className={classes.outputInput}>
        <PluginInput
          widgetType={'select'}
          value={schemaDefaultType}
          onChange={setSchemaDefaultType}
          label={'Schema Default Type'}
          options={schemaTypes}
        />
      </div>
    </div>
  );
};

const ExplicitSchemaDefiner = withStyles(styles)(ExplicitSchemaDefinerView);
export default ExplicitSchemaDefiner;

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

import KeyValuePairs from 'components/KeyValuePairs';
import { SupportedType } from 'components/PluginJSONCreator/Create/Content/WidgetCollection/WidgetAttributesCollection/WidgetAttributeInput/MultipleAttributesInput';
import { fromJS } from 'immutable';
import * as React from 'react';

// TODO use something other than <KeyValuePairs/> component
const KeyvalueRowsInput = ({
  widgetID,
  field,
  selectedType,
  localWidgetToAttributes,
  setLocalWidgetToAttributes,
}) => {
  const [currentAttributeValues, setCurrentAttributeValues] = React.useState({
    pairs: [{ key: '', value: '' }],
  });

  // When user switches the selectedType, reset 'currentAttributeValues'.
  // Whenever there is a change in 'localWidgetToAttributes', reset the 'currentAttributeValues'.
  React.useEffect(() => {
    setCurrentAttributeValues(processKeyValueAttributeValues());
  }, [selectedType, localWidgetToAttributes]);

  /*
   * The input fields can have some pre-populated values.
   * For instance, when the user imports a plugin JSON file into the UI,
   * it should parse those pre-populated values of widget attributes
   * and populate the input fields.
   *
   * Process key-value attribute values to pass the values to the input fields.
   * The component 'KeyValuePairs' receives the data of following structure.
   *    { pairs: [{ key: '', value: '' }] }
   */
  function processKeyValueAttributeValues() {
    const existingAttributeValues = localWidgetToAttributes.get(widgetID).get(field);
    if (existingAttributeValues && existingAttributeValues.size > 0) {
      const keyvaluePairs = {
        pairs: existingAttributeValues
          .map((keyvalue) => {
            if (keyvalue.get('id') !== undefined) {
              return {
                key: keyvalue.get('id'),
                value: keyvalue.get('label'),
              };
            } else {
              return {
                key: keyvalue.get('value'),
                value: keyvalue.get('label'),
              };
            }
          })
          .toJS(),
      };
      return keyvaluePairs;
    } else {
      return { pairs: [{ key: '', value: '' }] };
    }
  }

  const onKeyValueAttributeChange = (keyvalue, type: SupportedType) => {
    let keyvaluePairs;
    if (type === SupportedType.ValueLabelPair) {
      keyvaluePairs = keyvalue.pairs.map((pair) => {
        return { value: pair.key, label: pair.value };
      });
    } else {
      keyvaluePairs = keyvalue.pairs.map((pair) => {
        return { id: pair.key, label: pair.value };
      });
    }
    setLocalWidgetToAttributes(
      fromJS(localWidgetToAttributes).setIn([widgetID, field], fromJS(keyvaluePairs))
    );
  };

  const keyPlaceholder = selectedType === SupportedType.IDLabelPair ? 'id' : 'value';
  return (
    <div>
      <KeyValuePairs
        keyValues={currentAttributeValues}
        onKeyValueChange={(keyvalue) => onKeyValueAttributeChange(keyvalue, selectedType)}
        keyPlaceholder={keyPlaceholder}
        valuePlaceholder={'label'}
      />
    </div>
  );
};

export default KeyvalueRowsInput;

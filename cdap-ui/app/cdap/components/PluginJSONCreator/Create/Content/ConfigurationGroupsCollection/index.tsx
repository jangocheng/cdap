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

import Button from '@material-ui/core/Button';
import Heading, { HeadingTypes } from 'components/Heading';
import If from 'components/If';
import { useConfigurationGroupState, useWidgetState } from 'components/PluginJSONCreator/Create';
import GroupPanel from 'components/PluginJSONCreator/Create/Content/ConfigurationGroupsCollection/GroupPanel';
import StepButtons from 'components/PluginJSONCreator/Create/Content/StepButtons';
import { fromJS } from 'immutable';
import * as React from 'react';
import uuidV4 from 'uuid/v4';

const ConfigurationGroupsCollection = () => {
  const {
    configurationGroups,
    setConfigurationGroups,
    groupToInfo,
    setGroupToInfo,
  } = useConfigurationGroupState();
  const {
    groupToWidgets,
    setGroupToWidgets,
    widgetInfo,
    setWidgetInfo,
    widgetToAttributes,
    setWidgetToAttributes,
  } = useWidgetState();

  const [activeGroupIndex, setActiveGroupIndex] = React.useState(null);

  function addConfigurationGroup(index: number) {
    const newGroupID = 'ConfigGroup_' + uuidV4();
    return () => {
      // Add a new group's ID at the specified index
      let newGroups;
      if (configurationGroups.size === 0) {
        newGroups = configurationGroups.insert(0, newGroupID);
      } else {
        newGroups = configurationGroups.insert(index + 1, newGroupID);
      }
      setConfigurationGroups(newGroups);

      // Set the activeGroupIndex to the new group's index
      if (newGroups.size <= 1) {
        setActiveGroupIndex(0);
      } else {
        setActiveGroupIndex(index + 1);
      }

      // Set the mappings for the newly added group
      setGroupToInfo(
        groupToInfo.set(
          newGroupID,
          fromJS({
            label: '',
            description: '',
          })
        )
      );
      setGroupToWidgets(groupToWidgets.set(newGroupID, fromJS([])));
    };
  }

  function deleteConfigurationGroup(index: number) {
    return () => {
      setActiveGroupIndex(null);

      const groupToDelete = configurationGroups.get(index);

      // Delete a group at the specified index
      const newGroups = configurationGroups.delete(index);
      setConfigurationGroups(newGroups);

      // Delete the corresponding data of the group
      const newGroupToInfo = fromJS(groupToInfo.delete(groupToDelete));
      setGroupToInfo(newGroupToInfo);

      const widgetsToDelete = groupToWidgets.get(groupToDelete);
      const newGroupToWidgets = fromJS(groupToWidgets.delete(groupToDelete));
      setGroupToWidgets(newGroupToWidgets);

      // Delete all the widget information that belong to the group
      widgetsToDelete.map((widget) => {
        const newWidgetInfo = fromJS(widgetInfo.delete(widget));
        setWidgetInfo(newWidgetInfo);

        const newWidgetToAttributes = fromJS(widgetToAttributes.delete(widget));
        setWidgetToAttributes(newWidgetToAttributes);
      });
    };
  }

  const switchEditConfigurationGroup = (index) => (event, newExpanded) => {
    if (newExpanded) {
      setActiveGroupIndex(index);
    } else {
      setActiveGroupIndex(null);
    }
  };

  return React.useMemo(
    () => (
      <div>
        <Heading type={HeadingTypes.h3} label="Configuration Groups" />
        <br />
        <If condition={configurationGroups.size === 0}>
          <Button variant="contained" color="primary" onClick={addConfigurationGroup(0)}>
            Add Configuration Group
          </Button>
        </If>

        {configurationGroups.map((groupID, i) => (
          <GroupPanel
            key={groupID}
            groupID={groupID}
            configurationGroupExpanded={activeGroupIndex === i}
            switchEditConfigurationGroup={switchEditConfigurationGroup(i)}
            addConfigurationGroup={addConfigurationGroup(i)}
            deleteConfigurationGroup={deleteConfigurationGroup(i)}
          />
        ))}
        <StepButtons nextDisabled={false} />
      </div>
    ),
    [configurationGroups, activeGroupIndex]
  );
};

export default ConfigurationGroupsCollection;

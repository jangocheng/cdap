/*
 * Copyright © 2016 Cask Data, Inc.
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

class HydratorPlusPlusNodeService {
  constructor($q, HydratorPlusPlusHydratorService, IMPLICIT_SCHEMA, myHelpers, GLOBALS, avsc) {
    'ngInject';
    this.$q = $q;
    this.HydratorPlusPlusHydratorService = HydratorPlusPlusHydratorService;
    this.myHelpers = myHelpers;
    this.IMPLICIT_SCHEMA = IMPLICIT_SCHEMA;
    this.GLOBALS = GLOBALS;
    this.avsc = avsc;
  }
  getPluginInfo(node, appType, sourceConnections, sourceNodes, artifactVersion) {
    var promise;
    if (angular.isObject(node._backendProperties) && Object.keys(node._backendProperties).length) {
      promise = this.$q.when(node);
    } else {
      promise = this.HydratorPlusPlusHydratorService.fetchBackendProperties(node, appType, artifactVersion);
    }
    return promise.then((node) => this.configurePluginInfo(node, appType, sourceConnections, sourceNodes));
  }
  isFieldExistsInSchema(field, schema) {
    if(angular.isObject(schema) && Array.isArray(schema.fields)) {
      return schema.fields.filter(schemaField => schemaField.name === field.name).length;
    }
    return false;
  }
  configurePluginInfo(node, appType, sourceConnections, sourceNodes) {
    const getInputSchema = (sourceNode, targetNode, sourceConnections) => {
      let schema = '';
      let inputSchema;

      if (!sourceNode.outputSchema || typeof sourceNode.outputSchema === 'string') {
        sourceNode.outputSchema = [this.getOutputSchemaObj(sourceNode.outputSchema)];
      }

      if (sourceNode.outputSchema[0].name !== this.GLOBALS.defaultSchemaName) {
        let sourcePort = (sourceConnections.find(sconn => sconn.port) || {}).port;
        let sourceSchema = sourceNode.outputSchema.filter(outputSchema => outputSchema.name === sourcePort);
        schema = sourceSchema[0].schema;
      } else {
        schema = sourceNode.outputSchema[0].schema;
      }

      if (targetNode.type === 'errortransform') {
        if (this.GLOBALS.pluginConvert[node.type] === 'source' || (Array.isArray(sourceNode.inputSchema) && !sourceNode.inputSchema.length)) {
          return null;
        }
        schema = sourceNode.inputSchema && Array.isArray(sourceNode.inputSchema) ? sourceNode.inputSchema[0].schema : sourceNode.inputSchema;
      }

      if (Object.keys(this.IMPLICIT_SCHEMA).indexOf(sourceNode.plugin.properties.format) !== -1) {
        schema = this.IMPLICIT_SCHEMA[sourceNode.plugin.properties.format];
      }

      if (typeof schema === 'string'){
        if (this.HydratorPlusPlusHydratorService.containsMacro(schema)) {
          return schema;
        }
        try {
          inputSchema = JSON.parse(schema);
        } catch(e) {
          inputSchema = null;
        }
      } else {
        inputSchema = schema;
      }
      return inputSchema;
    };

    if (['action', 'source'].indexOf(this.GLOBALS.pluginConvert[node.type]) === -1) {
      node.inputSchema = sourceNodes.map(sourceNode => {
        const inputSchema = getInputSchema(sourceNode, node, sourceConnections);
        if (
          typeof inputSchema === 'string' &&
          this.HydratorPlusPlusHydratorService.containsMacro(inputSchema)
        ) {
          return {
            name: sourceNode.plugin.label,
            schema: inputSchema,
          };
        }
        return {
          name: sourceNode.plugin.label,
          schema: this.HydratorPlusPlusHydratorService.formatSchemaToAvro(inputSchema)
        };
      });
    }

    return node;
  }

  getOutputSchemaObj(schema, schemaObjName = this.GLOBALS.defaultSchemaName) {
    return {
      name: schemaObjName,
      schema
    };
  }

  getSchemaObj(fields = [], name = this.GLOBALS.defaultSchemaName, type = 'record') {
    return {
      type,
      name,
      fields
    };
  }

  shouldPropagateSchemaToNode(targetNode) {
    if (targetNode.implicitSchema || targetNode.type === 'batchjoiner' || targetNode.type === 'splittertransform') {
      return false;
    }

    // If we encounter a macro schema, stop propagataion
    let schema = targetNode.outputSchema;
    try {
      if (Array.isArray(schema)) {
        if (!_.isEmpty(schema[0].schema)) {
          this.avsc.parse(schema[0].schema, { wrapUnions: true });
        }
      } else if (typeof schema === 'string') {
        this.avsc.parse(schema, { wrapUnions: true });
      }
    } catch (e) {
      return false;
    }

    return true;
  }

  getPluginToArtifactMap(plugins = []) {
    let typeMap = {};
    plugins.forEach( plugin => {
      typeMap[plugin.name] = typeMap[plugin.name] || [];
      typeMap[plugin.name].push(plugin);
    });
    return typeMap;
  }

  getDefaultVersionForPlugin(plugin = {}, defaultVersionMap = {}) {
    if (!Object.keys(plugin).length) {
      return {};
    }
    let defaultVersionsList = Object.keys(defaultVersionMap);
    let key = `${plugin.name}-${plugin.type}-${plugin.artifact.name}`;
    let isDefaultVersionExists = defaultVersionsList.indexOf(key) !== -1;

    let isArtifactExistsInBackend = (plugin.allArtifacts || []).filter(plug => angular.equals(plug.artifact, defaultVersionMap[key]));
    if (!isDefaultVersionExists || !isArtifactExistsInBackend.length) {
      const highestVersion = window.CaskCommon.VersionUtilities.findHighestVersion(plugin.allArtifacts.map((plugin) => plugin.artifact.version), true);
      const latestPluginVersion = plugin.allArtifacts.find((plugin) => plugin.artifact.version === highestVersion);
      return this.myHelpers.objectQuery(latestPluginVersion, 'artifact');
    }

    return angular.copy(defaultVersionMap[key]);
  }
}

angular.module(PKG.name + '.feature.hydrator')
  .service('HydratorPlusPlusNodeService', HydratorPlusPlusNodeService);

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

jest.unmock('components/LogViewer/DataFetcher/ProgramDataFetcher');
import ProgramDataFetcher from 'components/LogViewer/DataFetcher/ProgramDataFetcher';
import { LogLevel } from 'components/LogViewer/types';
import { MyProgramApi } from 'api/program';

const PROGRAM_INFO = {
  namespace: 'namespace',
  application: 'application',
  programType: 'programType',
  programName: 'programName',
  runId: 'run-1',
};

const BASE_FILTER = 'AND .origin=plugin OR .origin=program';
const BASE_LOGS_PARAMS = {
  namespace: PROGRAM_INFO.namespace,
  appId: PROGRAM_INFO.application,
  programType: PROGRAM_INFO.programType,
  programId: PROGRAM_INFO.programName,
  runId: PROGRAM_INFO.runId,
  max: 50,
  format: 'json',
  filter: `loglevel=INFO ${BASE_FILTER}`,
};

describe('LogViewer - Program DataFetcher', () => {
  let dataFetcher: ProgramDataFetcher;
  beforeEach(() => {
    dataFetcher = new ProgramDataFetcher(PROGRAM_INFO);
  });

  it('should initialize without system logs', () => {
    expect(dataFetcher.getIncludeSystemLogs()).toBe(false);
  });

  it('should be able to include system logs', () => {
    const initSpy = jest.spyOn(dataFetcher, 'init');
    const prevLogsSpy = jest.spyOn(MyProgramApi, 'prevLogs');
    dataFetcher.setIncludeSystemLogs(true).subscribe();
    expect(dataFetcher.getIncludeSystemLogs()).toBe(true);
    expect(initSpy).toHaveBeenCalled();
    expect(prevLogsSpy).toHaveBeenCalledWith({
      ...BASE_LOGS_PARAMS,
      filter: 'loglevel=INFO',
    });
    initSpy.mockRestore();
    prevLogsSpy.mockRestore();
  });

  it('should default log level to INFO', () => {
    expect(dataFetcher.getLogLevel()).toBe(LogLevel.INFO);
  });

  it('should set correct log level', () => {
    const initSpy = jest.spyOn(dataFetcher, 'init');
    const prevLogsSpy = jest.spyOn(MyProgramApi, 'prevLogs');
    dataFetcher.setLogLevel(LogLevel.TRACE).subscribe();
    expect(dataFetcher.getLogLevel()).toBe(LogLevel.TRACE);
    expect(initSpy).toHaveBeenCalled();
    expect(prevLogsSpy).toHaveBeenCalledWith({
      ...BASE_LOGS_PARAMS,
      filter: `loglevel=TRACE ${BASE_FILTER}`,
    });
    initSpy.mockRestore();
    prevLogsSpy.mockRestore();
  });

  it('should fetch the next set of logs', () => {
    const nextLogsSpy = jest.spyOn(MyProgramApi, 'nextLogs');
    dataFetcher.init().subscribe(() => {
      dataFetcher.getNext().subscribe();
      expect(nextLogsSpy).toHaveBeenCalledWith({
        ...BASE_LOGS_PARAMS,
        fromOffset: '2',
      });
    });
    nextLogsSpy.mockRestore();
  });

  it('should fetch the previous set of logs', () => {
    const prevLogsSpy = jest.spyOn(MyProgramApi, 'prevLogs');
    dataFetcher.init().subscribe(() => {
      dataFetcher.getNext().subscribe();
      expect(prevLogsSpy).toHaveBeenCalledWith({
        ...BASE_LOGS_PARAMS,
        fromOffset: '1',
      });
    });
    prevLogsSpy.mockRestore();
  });

  it('getLast should fetch logs without offset', () => {
    const prevLogsSpy = jest.spyOn(MyProgramApi, 'prevLogs');
    dataFetcher.init().subscribe(() => {
      dataFetcher.getLast().subscribe();
      expect(prevLogsSpy).toHaveBeenCalledWith(BASE_LOGS_PARAMS);
    });
    prevLogsSpy.mockRestore();
  });

  it('getFirst should fetch logs without offset', () => {
    const nextLogsSpy = jest.spyOn(MyProgramApi, 'nextLogs');
    dataFetcher.init().subscribe(() => {
      dataFetcher.getLast().subscribe();
      expect(nextLogsSpy).toHaveBeenCalledWith(BASE_LOGS_PARAMS);
    });
    nextLogsSpy.mockRestore();
  });

  it('init should call getLast', () => {
    const getLastSpy = jest.spyOn(dataFetcher, 'getLast');
    dataFetcher.init().subscribe();
    expect(getLastSpy).toHaveBeenCalled();
    getLastSpy.mockRestore();
  });
});

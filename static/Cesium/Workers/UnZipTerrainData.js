/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(['./when-a55a8a4c', './createTaskProcessorWorker', './pako_inflate-8ea163f9'], function (when, createTaskProcessorWorker, pako_inflate) { 'use strict';

    function UnZipTerrainData(parameters, transferableObjects) {
        var buffer = parameters.data;
        var dataZip = new Uint8Array(buffer);
        var unzipBuffer = pako_inflate.pako.inflate(dataZip).buffer;
        transferableObjects.push(unzipBuffer);

        return {
            data : new Uint8Array(unzipBuffer)
        };
    }

    var UnZipTerrainData$1 = createTaskProcessorWorker(UnZipTerrainData);

    return UnZipTerrainData$1;

});

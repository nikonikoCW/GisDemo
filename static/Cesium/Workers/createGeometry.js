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
define(['./when-a55a8a4c', './Check-bc1d37d9', './Math-edfe2d1c', './Cartesian2-f0158650', './BoundingSphere-02d3af5e', './RuntimeError-7c184ac0', './WebGLConstants-4c11ee5f', './ComponentDatatype-919a7463', './GeometryAttribute-de0e4f68', './PrimitiveType-97893bc7', './FeatureDetection-bac17d71', './Transforms-a6232c91', './GeometryAttributes-1c7ce91d', './AttributeCompression-e0c793ea', './GeometryPipeline-ac3328f3', './EncodedCartesian3-d5c0d180', './IndexDatatype-18a8cae6', './IntersectionTests-b4e5ec49', './Plane-a550aa8c', './PrimitivePipeline-1fadb734', './WebMercatorProjection-d2c34b8d', './createTaskProcessorWorker'], function (when, Check, _Math, Cartesian2, BoundingSphere, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, PrimitiveType, FeatureDetection, Transforms, GeometryAttributes, AttributeCompression, GeometryPipeline, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, PrimitivePipeline, WebMercatorProjection, createTaskProcessorWorker) { 'use strict';

    /* global require */

    var moduleCache = {};

    function getModule(moduleName) {
        var module = moduleCache[moduleName];
        if (!when.defined(module)) {
            if (typeof exports === 'object') {
                // Use CommonJS-style require.
                moduleCache[module] = module = require('Workers/' + moduleName);
            } else {
                // Use AMD-style require.
                // in web workers, require is synchronous
                require(['Workers/' + moduleName], function(f) {
                    module = f;
                    moduleCache[module] = f;
                });
            }
        }
        return module;
    }

    function createGeometry(parameters, transferableObjects) {
        var subTasks = parameters.subTasks;
        var length = subTasks.length;
        var resultsOrPromises = new Array(length);

        for (var i = 0; i < length; i++) {
            var task = subTasks[i];
            var geometry = task.geometry;
            var moduleName = task.moduleName;

            if (when.defined(moduleName)) {
                var createFunction = getModule(moduleName);
                resultsOrPromises[i] = createFunction(geometry, task.offset);
            } else {
                //Already created geometry
                resultsOrPromises[i] = geometry;
            }
        }

        return when.when.all(resultsOrPromises, function(results) {
            return PrimitivePipeline.PrimitivePipeline.packCreateGeometryResults(results, transferableObjects);
        });
    }
    var createGeometry$1 = createTaskProcessorWorker(createGeometry);

    return createGeometry$1;

});

# 介绍：

##### 该Gisdemo采用了vue+cesium实现三维地球，其中cesium采用了[**Vue-iClient3D-WebGL**](http://support.supermap.com.cn:8090/webgl/examples/component/dist/)的vue组件，该组件是基于supermap-cesium进行封装。

# 实现步骤：

#### 1.创建vue项目，并且完成项目的初始化

#### 2.引入[**Vue-iClient3D-WebGL**](http://support.supermap.com.cn:8090/webgl/examples/component/dist/)包

#### 3.初始化三维地球

```xml
<template>
  <div class="hello">
    <sm-viewer>
    </sm-viewer>
  </div>
</template>
```

![](https://github.com/nikonikoCW/GisDemo/tree/main/image/1.jpg)

#### 4.设置场景数据

```xml
<template>
  <div class="hello">
    <sm-viewer :scene-url="URL">
    </sm-viewer>
  </div>
</template>
```

![](https://github.com/nikonikoCW/GisDemo/tree/main/image/2.jpg)

#### 5.加载google影像数据（使用了imageryLayer.addImageryProvider）

```javascript
viewer.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
    	url:"http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"
	})
)
```

![](https://github.com/nikonikoCW/GisDemo/tree/main/image/3.jpg)

#### 6.添加已经封装好的淹没分析模拟组件

==说明:淹没分析组件原理：根据需要绘制多边形，再使用定时器进行多边形的高度叠增==

```xml
<template>
  <div class="hello">
    <sm-viewer :scene-url="URL">
      <sm3d-measure></sm3d-measure>
      <sm3d-terrain-flood></sm3d-terrain-flood>
    </sm-viewer>
  </div>
</template>
```



```javascript
//淹没分析实现功能
_drawWater(targetHeight, adapCoordi) {
		let entity = this.earth.entities.add({
			polygon: {
				hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(adapCoordi),
				material: new GV.Color.fromBytes(64, 157, 253, 150),
				perPositionHeight: true,
				extrudedHeight: 0.0,
			}
		})
		this.waterEntities = entity
		let waterHeight = adapCoordi[2]
			this.timer = setInterval(() => {
			if (waterHeight < targetHeight) {
				waterHeight += 100
				if (waterHeight > targetHeight) {
					waterHeight = targetHeight
				}
				entity.polygon.extrudedHeight.setValue(waterHeight)
			}
		}, 100)
		this.entities.push(entity)
	}
```



![](https://github.com/nikonikoCW/GisDemo/tree/main/image/4.jpg)

#### 7.添加已经封装好的量测组件

![](https://github.com/nikonikoCW/GisDemo/tree/main/image/5.jpg)

![](https://github.com/nikonikoCW/GisDemo/tree/main/image/6.jpg)

#### 8.创建矢量图层文件（geojson/kml），此次演示采用了线上生成geojson文件

![](https://github.com/nikonikoCW/GisDemo/tree/main/image/7.jpg)

#### 9.设置三维地球动画定位

```javascript
viewer.scene.camera.flyTo({
        destination: new Cesium.Cartesian3(
          -2167835.4408299956,
          4423497.534529096,
          4095839.2845661934
        ),
        orientation: {
          heading: 2.029329438295484,
          pitch: -0.23796647219353817,
          roll: 8.994289757424667e-10,
        },
        duration:5
      });
```



#### 10.加载geojson文件，且在地图中显示矢量图层同时视角延时定位到矢量图层位置

```javascript
setTimeout(function(){
        let promise = Cesium.GeoJsonDataSource.load('../../static/test.json')
        promise.then(function(dataSource) {
          debugger
            viewer.dataSources.add(dataSource);

            var entities = dataSource.entities.values;

            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                debugger
                let color = Cesium.Color.fromRandom({
                    alpha : 1.0
                });
                debugger
                entity.polygon.material = color;
                // entity.polygon.outline = false;

                entity.polygon.extrudedHeight = 100; 
                entity.point = new Cesium.PointGraphics({
                    color: Cesium.Color.RED,
                    pixelSize: 10
                });
            }
        });
        viewer.flyTo(promise);
    },3000)
```



![](https://github.com/nikonikoCW/GisDemo/tree/main/image/8.jpg)

#### 11.设置鼠标监听事件，捕捉该空间地理坐标位置处的模型（矢量图层或者BIM模型），同时将矢量图层填充为白色，并打印该图层的**name**信息

```javascript
hightlightLine() {
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function(click) {
          debugger
            var pick = viewer.scene.pick(click.position);
            pick.id.polygon.material = Cesium.Color.WHITE;
            alert(pick.id.properties.name)
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK  );
    }
```



![](https://github.com/nikonikoCW/GisDemo/tree/main/image/11.jpg)

![](https://github.com/nikonikoCW/GisDemo/tree/main/image/9.jpg)

![](.https://github.com/nikonikoCW/GisDemo/tree/main/image/10.jpg)

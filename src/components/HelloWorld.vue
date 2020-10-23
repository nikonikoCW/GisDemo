<template>
  <div class="hello">
 <!-- :scene-url="URL" -->
    <sm-viewer :scene-url="URL">
      <sm3d-measure></sm3d-measure>
      <sm3d-terrain-flood></sm3d-terrain-flood>
  </sm-viewer>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      URL: "http://www.supermapol.com/realspace/services/3D-ZF_normal/rest/realspace"
    }
  },
  mounted(){
      viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
        url:"http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"
      }))
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
    this.hightlightLine()
  },
  methods:{
    linehHghtlight(temp,nameId) {
            var exists = temp.indexOf(nameId);
            if (exists <= -1) {
                temp.push(nameId);
            } else {
                temp.splice(exists, 1);  //删除对应的nameID
            }
      },
    hightlightLine() {
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function(click) {
          debugger
            var pick = viewer.scene.pick(click.position);
            pick.id.polygon.material = Cesium.Color.WHITE;
            alert(pick.id.properties.name)
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK  );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hello{
  width: 100%;
  height: 100%;
}
.cesium-viewer-bottom{
  display: none !important;
}
</style>

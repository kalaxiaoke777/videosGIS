define([
    'dojo/_base/declare',
    'esri/geometry/SpatialReference',
    'esri/views/3d/externalRenderers',
    'esri/tasks/QueryTask',
    'esri/tasks/support/Query',
], function (declare, SpatialReference, externalRenderers, QueryTask, Query, glMatrix) {
    'use strict';
    var THREE = window.THREE;

    var yzrVideoCastLayer = declare(null, {
        constructor: function (view, options) {
            options = options || {};
            this.view = view;
            this.renderObject = null;
            this.videoDomID=options.videoDomID;
            this.castMapSequence = options.castMapSequence;
            this.castMapCoordArray = options.castMapCoordArray;
            this.castVideoSequence = options.castVideoSequence;
            this.castVideoCoordArray = options.castVideoCoordArray;
            this.mapHighControlGeometryArray = options.mapHighControlGeometryArray;
        },
        setup: function (context) {
            this.renderer = new THREE.WebGLRenderer({
                context: context.gl, //可用于将渲染器附加到已有的渲染环境(RenderingContext)中
                premultipliedAlpha: false, // renderer是否假设颜色有 premultiplied alpha. 默认为true
            });
            this.renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
            this.renderer.setViewport(0, 0, this.view.width, this.view.height); // 视口大小设置
            // this.renderer.setSize(context.camera.fullWidth, context.camera.fullHeight);

            // Make sure it does not clear anything before rendering
            this.renderer.autoClear = false;
            this.renderer.autoClearDepth = false;
            this.renderer.autoClearColor = false;
            // this.renderer.autoClearStencil = false;

            // The ArcGIS JS API renders to custom offscreen buffers, and not to the default framebuffers.
            // We have to inject this bit of code into the three.js runtime in order for it to bind those
            // buffers instead of the default ones.
            var originalSetRenderTarget = this.renderer.setRenderTarget.bind(this.renderer);
            this.renderer.setRenderTarget = function (target) {
                originalSetRenderTarget(target);
                if (target == null) {
                    context.bindRenderTarget();
                }
            };

            this.scene = new THREE.Scene();
            // setup the camera
            var cam = context.camera;
            this.camera = new THREE.PerspectiveCamera(cam.fovY, cam.aspect, cam.near, cam.far);

            //环境光还是要有的，要不然太黑
            this.ambient = new THREE.AmbientLight(0xffffff, 0.5);
            this.scene.add(this.ambient);
            this.sun = new THREE.DirectionalLight(0xffffff, 0.5);
            this.sun.position.set(-600, 300, 60000);
            this.scene.add(this.sun);
            //var geometrys = this.getCoords(context);
            //var canvas = this.produceCanvas();
            this.clock = new THREE.Clock();
            this.getCoords(context);
            context.resetWebGLState();
        },
        render: function (context) {

            var cam = context.camera;
            //需要调整相机的视角
            this.camera.position.set(cam.eye[0], cam.eye[1], cam.eye[2]);
            this.camera.up.set(cam.up[0], cam.up[1], cam.up[2]);
            this.camera.lookAt(new THREE.Vector3(cam.center[0], cam.center[1], cam.center[2]));
            // Projection matrix can be copied directly
            this.camera.projectionMatrix.fromArray(cam.projectionMatrix);

            var l = context.sunLight;
            this.sun.position.set(
                l.direction[0],
                l.direction[1],
                l.direction[2]
            );
            this.sun.intensity = l.diffuse.intensity;
            this.sun.color = new THREE.Color(l.diffuse.color[0], l.diffuse.color[1], l.diffuse.color[2]);
            this.ambient.intensity = l.ambient.intensity;
            this.ambient.color = new THREE.Color(l.ambient.color[0], l.ambient.color[1], l.ambient.color[2]);

            this.renderer.state.reset();
            this.renderer.render(this.scene, this.camera);
            // as we want to smoothly animate the ISS movement, immediately request a re-render
            externalRenderers.requestRender(this.view);
            // cleanup
            context.resetWebGLState();
        },
        getCoords: function (context) {
            this.renderObject = new THREE.Object3D();

            //贴图纹理来自Dom的Video元素           
            let videoDom = document.getElementById(this.videoDomID);
            var texture = new THREE.VideoTexture(videoDom)
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            //构建材质
            var material = new THREE.MeshPhongMaterial({
                map: texture,
            });
            //笛卡尔坐标系下数组，备用
            var cartesianCoordsArray = new Array(this.castMapCoordArray.length);
            //坐标转换需要的数组，需要格式为[x,y,z]，而不是arcgis中的Geometry
            var needArray = new Array();
            for (var i = 0; i < this.castMapCoordArray.length; i++) {
                needArray.push(this.castMapCoordArray[i].x);
                needArray.push(this.castMapCoordArray[i].y);
                needArray.push(this.castMapCoordArray[i].z);
            }
            //坐标转换结果存储于cartesianCoordsArray
            externalRenderers.toRenderCoordinates(this.view, needArray, 0, null, cartesianCoordsArray, 0, this.castMapCoordArray.length);
            //构造Geometry
            var videoGeometry = new THREE.Geometry();
            //把地图四角点坐标、地面控制点依次推进去
            for (var i = 0; i < this.castMapCoordArray.length; i++) {
                var vector = new THREE.Vector3(cartesianCoordsArray[i * 3], cartesianCoordsArray[i * 3 + 1], cartesianCoordsArray[i * 3 + 2]);
                videoGeometry.vertices.push(vector);
            }
           
            ////三角面法向量，不知道其他地方是不是要变，这里是西安的
            var normal = new THREE.Vector3(-1707616.9163, 4988880.87787, 3589024.14400); 
            //地图坐标的蒂洛尼三角网
            for (var i = 0; i < this.castMapSequence.length / 3; i++) {
                var p1 = this.castMapSequence[i * 3];
                var p2 = this.castMapSequence[i * 3 + 1];
                var p3 = this.castMapSequence[i * 3 + 2]
                videoGeometry.faces.push(new THREE.Face3(p1, p2, p3, normal));
            }

            //视频的蒂洛尼比较简单，把视频角点推进去，再把控制点推进去
            var videoVector2Array = new Array();
            for (var i = 0; i < this.castVideoCoordArray.length; i++) {
                videoVector2Array.push(new THREE.Vector2(this.castVideoCoordArray[i][0], this.castVideoCoordArray[i][1]));
            }
            //根据蒂洛尼三角网，构构造uv面推进去。
            for (var i = 0; i < this.castVideoSequence.length / 3; i++) {
                var uv = [videoVector2Array[this.castVideoSequence[i * 3]], videoVector2Array[this.castVideoSequence[i * 3 + 1]], videoVector2Array[this.castVideoSequence[i * 3 + 2]]]
                videoGeometry.faceVertexUvs[0].push(uv);
            }
            //构造mesh对象
            var mesh = new THREE.Mesh(videoGeometry, material);
            this.renderObject.add(mesh);
            this.scene.add(this.renderObject);
            context.resetWebGLState();
        },
        dispose: function (content) { }
    })

    return yzrVideoCastLayer;
});
/**
 * sent events :
 * 
 * used events :
 */

import * as THREE from "./../jsm/three/three.module.js";
import { GLTFLoader } from "./../jsm/three/GLTFLoader.js";

import config from "./../config.js";

var scene;

function init(l_scene,file_name,user_on_load){
    scene = l_scene;
	var loader = new GLTFLoader();
    loader.load(file_name,
        gltf => {
            console.log("node> gltf loaded");
            
            let node = gltf.scene.getObjectByName("Node");
            //node.visible = false;
            scene.add(node);
            user_on_load();
        }
    );
    console.log("node> init()");
}

function send_custom_event(event_name,data){
	var event = new CustomEvent(event_name, {detail:data});
	window.dispatchEvent(event);
}

export{init};

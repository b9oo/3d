//% color="#AA278D" weight=100 icon="\uf1b2" block="3D Models"
namespace models3d {

    export let camera: Camera = new Camera();

    //% block="set camera position x %x y %y z %z"
    export function setCameraPosition(x: number, y: number, z: number) {
        camera.x = x;
        camera.y = y;
        camera.z = z;
    }

    //% block="set camera rotation yaw %yaw pitch %pitch"
    export function setCameraRotation(yaw: number, pitch: number) {
        camera.yaw = yaw;
        camera.pitch = pitch;
    }

    //% block="render all meshes"
    export function render() {
        camera.render();
    }

    //% block="create mesh from vertices %verts and faces %faces with color %color"
    //% verts.defl="[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]]"
    //% faces.defl="[[0,1,2],[0,2,3],[4,5,6],[4,6,7],[0,1,5],[0,5,4],[2,3,7],[2,7,6],[0,3,7],[0,7,4],[1,2,6],[1,6,5]]"
    export function createMesh(verts: number[][], faces: number[][], color: number = 0xFF): Mesh {
        let mesh = new Mesh(verts, faces, color);
        meshes.push(mesh);
        return mesh;
    }

    let meshes: Mesh[] = [];
}

// Helper classes in separate files

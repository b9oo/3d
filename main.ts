//% color="#AA278D" weight=100 icon="\uf1b2" block="3D Models"
namespace models3d {

    export let camera: Camera = new Camera();
    let meshes: Mesh[] = [];

    //% block="load mesh from OBJ text %objText with color %color"
    //% objText.defl="v -1 -1 -1\nv 1 -1 -1\n..." group="Models"
    export function loadMeshFromOBJ(objText: string, color: number = 0xFF): Mesh {
        let mesh = parseOBJ(objText, color);
        if (mesh) {
            meshes.push(mesh);
        }
        return mesh;
    }

    //% block="render all meshes"
    export function render() {
        camera.render();
    }

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

    function parseOBJ(objText: string, defaultColor: number): Mesh | null {
        let vertices: number[][] = [];
        let faces: number[][] = [];

        const lines = objText.split('\n');

        for (let line of lines) {
            line = line.trim();
            if (line.startsWith('v ')) {
                // Vertex: v x y z
                const parts = line.split(/\s+/);
                if (parts.length >= 4) {
                    const x = parseFloat(parts[1]);
                    const y = parseFloat(parts[2]);
                    const z = parseFloat(parts[3]);
                    vertices.push([x, y, z]);
                }
            } else if (line.startsWith('f ')) {
                // Face: f v1 v2 v3  (we ignore texture/normal indices for now)
                const parts = line.split(/\s+/);
                if (parts.length >= 4) {
                    const idx1 = parseInt(parts[1].split('/')[0]) - 1;
                    const idx2 = parseInt(parts[2].split('/')[0]) - 1;
                    const idx3 = parseInt(parts[3].split('/')[0]) - 1;
                    if (!isNaN(idx1) && !isNaN(idx2) && !isNaN(idx3)) {
                        faces.push([idx1, idx2, idx3]);
                    }
                }
            }
        }

        if (vertices.length === 0 || faces.length === 0) {
            return null;
        }

        return new Mesh(vertices, faces, defaultColor);
    }
}

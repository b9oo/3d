namespace models3d {

    export class Mesh {
        public vertices: number[][];
        public faces: number[][];
        public color: number;
        public x: number = 0;
        public y: number = 0;
        public z: number = 0;
        public scale: number = 1;
        public rotationX: number = 0;
        public rotationY: number = 0;
        public rotationZ: number = 0;

        constructor(verts: number[][], faces: number[][], color: number) {
            this.vertices = verts;
            this.faces = faces;
            this.color = color;
        }

        //% block="set mesh %this position x %x y %y z %z"
        setPosition(x: number, y: number, z: number) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        //% block="set mesh %this rotation x %rx y %ry z %rz"
        setRotation(rx: number, ry: number, rz: number) {
            this.rotationX = rx;
            this.rotationY = ry;
            this.rotationZ = rz;
        }
    }
}

namespace models3d {

    export class Camera {
        public x: number = 0;
        public y: number = 0;
        public z: number = -10;
        public yaw: number = 0;
        public pitch: number = 0;

        render() {
            screen.fill(0);
            // Very basic perspective projection + triangle drawing
            // (expand this with proper matrix math for better results)
            for (let mesh of models3d.meshes || []) {
                for (let face of mesh.faces) {
                    let p1 = projectPoint(mesh, face[0]);
                    let p2 = projectPoint(mesh, face[1]);
                    let p3 = projectPoint(mesh, face[2]);

                    if (p1 && p2 && p3) {
                        screen.fillTriangle(
                            Math.round(p1[0]), Math.round(p1[1]),
                            Math.round(p2[0]), Math.round(p2[1]),
                            Math.round(p3[0]), Math.round(p3[1]),
                            mesh.color
                        );
                    }
                }
            }
        }

        private projectPoint(mesh: Mesh, idx: number): number[] | null {
            let v = mesh.vertices[idx];
            // Simple transform + perspective (improve with full matrices)
            let dx = v[0] * mesh.scale + mesh.x - this.x;
            let dy = v[1] * mesh.scale + mesh.y - this.y;
            let dz = v[2] * mesh.scale + mesh.z - this.z;

            // Basic rotation omitted for brevity - add matrix if needed

            if (dz <= 0) return null;

            let f = 200 / dz; // focal length
            let sx = 80 + dx * f;
            let sy = 60 + dy * f;

            return [sx, sy];
        }
    }
}

export function generatePointsInTriangle(n, triangle) {
    const [A, B, C] = triangle;
    const points = [];
    for (let i = 0; i < n; i++) {
        let r1 = Math.random(); 
        let r2 = Math.random();
        // Apply the square root of r1
        r1 = Math.sqrt(r1);

        let x = (1 - r1) * A[0] + (1 - r2) * r1 * B[0] + r2 * r1 * C[0];
        x = Math.round(x * 10)/10;
        let y = (1 - r1) * A[1] + (1 - r2) * r1 * B[1] + r2 * r1 * C[1];
        y = Math.round(y * 10)/10;
        points.push([x, y]);
    }

    return points;
}

import { isPointInTriangle } from "./isPointInTriangle.js";

export function getTargetTriangle(point, triangles){
    for(let triangle of triangles){
        if(isPointInTriangle(point, triangle)){
            return triangle;
        }
    }
}
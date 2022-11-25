import { useEffect, useState } from "react";
import './Pointer.scss';

const Pointer = () => {
    const [points, setPoints] = useState([]);
    const [popped, setPopped] = useState([]);

    function handleClick (e) {
        const {pageX, pageY} = e;
        setPoints([...points, {x: pageX, y: pageY}])
    }

    useEffect(() => {
        console.log(points); 
    }, [points])
    
    function handleUndo () {
        const newPoints = [...points];
        const poppedPoint = newPoints.pop();
        if (!poppedPoint) return;
        setPopped([...popped, poppedPoint])
        setPoints(newPoints);
    }

    function handleRedo () {
        const newPopped = [...popped];
        const poppedPoint = newPopped.pop();
        if (!poppedPoint) return;
        setPoints([...points, poppedPoint]);
        setPopped(newPopped)
    }

    return <>
        <button onClick={handleUndo}>Deshacer</button>
        <button onClick={handleRedo}>ReDo!</button>
        <div className="pointer" onClick={handleClick}>
            {
                points.length &&
                points.map((item, index) => {
                    return <div key={index} className="point" style={{position:"absolute", left:item.x, top: item.y}}></div>
                })
            }
        </div>
    </>
    
}

export default Pointer;
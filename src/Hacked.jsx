import { useEffect, useState } from "react";
import './Hacked.scss';

const Hacked = () => {
    const [videoData, setVideoData] = useState({});

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3d6ce1dc4dmsheff8f4ab64cf10cp104759jsnfc9fc7288273',
            'X-RapidAPI-Host': 't-one-youtube-converter.p.rapidapi.com'
        }
    };

    useEffect(() => {
        console.log(videoData); 
    }, [videoData])

    const downloadMp3 = (e) => {
        const videoUrl = e.currentTarget.closest(".searcher").querySelector("input").value;
        fetch(`https://t-one-youtube-converter.p.rapidapi.com/api/v1/createProcess?url=${videoUrl}&format=mp3&responseFormat=json&lang=en`, options)
            .then(response => response.json())
            .then(response => {
                // console.log(response)
                setVideoData(response);
            })
            .catch(err => console.error(err));
    }

    return <div className="searcher">
        <input type="text" placeholder="Insertar url de youtube" />
        <button onClick={downloadMp3}>Download</button>
        {
            Object.keys(videoData).length ?
            <div className="result">
                <h3>{videoData.YoutubeAPI?.titolo}</h3>
                <img className="img" src={videoData.YoutubeAPI?.thumbUrl} alt="" />
                <div className="desc">
                    <span dangerouslySetInnerHTML={{__html: videoData.YoutubeAPI?.descrizione}}></span>
                </div>
                {
                    videoData?.message === "already downloaded" &&
                    <div>
                        <h4>Si deseas descargar el mp3 del video, dale click a:</h4>
                        <a href={videoData.YoutubeAPI?.urlMp3}>DESCARGAR AQUÍ</a>
                    </div>
                }
                
            </div> : 
            <div className="loader" />
        }
        
    </div> 
}

export default Hacked;
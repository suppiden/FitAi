import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Comments = ({ threadId }) => {
    const navigate = useNavigate();
    const [numReplies, setNumReplies] = useState(0);
    console.log('esto es en comments para threadID', threadId)


    useEffect(() => {
        axios.get(`http://localhost:8081/thread/${threadId}/replies`)
            .then(response => {
                if (response.data && response.data.NumOfReplies !== undefined) {
                    setNumReplies(response.data.NumOfReplies);
                } else {
                    console.log("No hay respuestas o el número de respuestas es 0.");
                }
            })
            .catch(error => {
                console.error("Error al obtener respuestas: ", error);
            });
    }, [threadId]);

    const handleAddComment = () => {
        console.log("chacha")
        axios.get(`http://localhost:8081/thread/${threadId}/replies`
        ).then((data) =>{
            console.log("esto es console log en comments en handle",data)
            setNumReplies(data.NumOfReplies)
            navigate(`/${threadId}/replies`);
        })
        
        
    };

    return (
        <div className='likes__container'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='green'
                className='w-6 h-6 likesBtn'
                onClick={handleAddComment}
            >
                <path
                    fillRule='evenodd'
                    d='M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z'
                    clipRule='evenodd'
                />
            </svg>
            <p style={{ color: "#434242" }}>
                {numReplies === 0 ? "" : numReplies}
            </p>
        </div>
    );
};

export default Comments;
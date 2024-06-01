import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Likes from "./Likes";
import Comments from "./Comments";
import './forum.css';
import useVerifySession from "./customHooks/useVerifySession";
import useVerifyEmail from "./customHooks/useVerifyEmail";
import useVerifyPago from "./customHooks/useVerifyPago";
import ClipLoader from "react-spinners/ClipLoader"; // Importa el spinner

const Home = () => {
    const navigate = useNavigate();
    const [threads, setThreads] = useState([]);
    const [threadInput, setThreadInput] = useState('');
    const { userId } = useVerifySession();
    const emailError = useVerifyEmail(userId);
    const { userId: pagoUserId, error: pagoError } = useVerifyPago(userId); // eslint-disable-line no-unused-vars
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const verifyUser = async () => {
            if (emailError || pagoError) {
                navigate("/");
            } else {
                setLoading(false);
            }
        };

        verifyUser();
    }, [emailError, pagoError, navigate]);

    useEffect(() => {
        if (!loading) {
            const fetchThreads = async () => {
                try {
                    const response = await axios.get("http://localhost:8081/create/thread");
                    setThreads(response.data.allThreads);
                } catch (error) {
                    console.error('Error fetching threads:', error);
                }
            };
            fetchThreads();
        }
    }, [loading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userId) {
            createThread(threadInput, userId);
            setThreadInput('');
        } else {
            console.error('No hay ID de usuario disponible');
        }
    };

    const createThread = (thread, userId) => {
        axios.post("http://localhost:8081/create/thread", {
            thread,
            userId,
        })
            .then((response) => {
                // Manejar la respuesta si es necesario
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    if (loading) {
        return (
            <div className="spinner-container">
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>
        );
    }

    return (
        <>
            <Nav userId={!!userId} />
            <main className='homeForum'>
                <h2 className='homeTitleForum'>Create a Thread</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                    <div className='homeContainerForum'>
                        <label htmlFor='thread'>Title / Description</label>
                        <input
                            type='text'
                            name='thread'
                            required
                            value={threadInput}
                            onChange={(e) => setThreadInput(e.target.value)} />
                    </div>
                    <button className='homeBtnForum'>CREATE THREAD</button>
                </form>
                <div className='threadContainerForum'>
                    {threads.map((thread) => (
                        <div className='threadItemForum' key={thread.id}>
                            <p>{thread.titulo}</p>
                            <div className='reactContainerForum'>
                                <Likes userId={userId} thread={thread.id} />
                                <Comments
                                    threadId={thread.id}
                                    title={thread.titulo}
                                    userId={userId}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
};

export default Home;

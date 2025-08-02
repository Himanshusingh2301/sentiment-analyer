import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomerReviewPanel from './CustomerReviewsPanel';
import { gsap } from "gsap";
import { SignedIn, SignedOut, SignInButton, UserButton, SignUpButton } from '@clerk/clerk-react'

const Home = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [addrotate, setaddrotate] = useState('');
    const [minrotate, setminrotate] = useState('');
    const [arrowrot, setarrowrot] = useState('')
    const [panelopen, setpanelopen] = useState(true);
    const [selectedreview, setselectedreview] = useState(null);
    const [slowResponse, setSlowResponse] = useState(false);
    const panelRef = useRef();
    const arrowRef = useRef();
    const resultRef = useRef(null);
    const [itemdetail, setitemdetail] = useState({})
    const cardref = useRef();
    const [filename, setFilename] = useState(() => {
        const stored = localStorage.getItem('filename');
        return stored ? stored : ''
    });
    const [reviews, setReviews] = useState(() => {
        const stored = JSON.parse(localStorage.getItem('reviews'));
        return stored ? stored : []

    })


    useEffect(() => {
        const updated = reviews.map((item, idx) => ({
            ...item,
            __rowNum__: idx,
        }));
        if (updated)
            localStorage.setItem('reviews', JSON.stringify(updated));
        if (filename)
            localStorage.setItem('filename', filename)
    }, [filename, reviews]);


    useEffect(() => {
        if (result) {
            gsap.fromTo(
                resultRef.current,
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }
            );

        }
    }, [result]);

    useEffect(() => {
        if (panelRef.current) {
            if (panelopen) {
                gsap.to(panelRef.current, {
                    x: 0,
                    duration: 0.5,
                    ease: "power1.out",
                    opacity: 1,
                });
            } else {
                gsap.to(panelRef.current, {
                    x: "100%",
                    duration: 0.5,
                    ease: "power3.in",
                    opacity: 0,
                });
            }
        }
    }, [panelopen]);

    const handleaddrotate = () => {
        setaddrotate(180);
        setTimeout(() => {
            setaddrotate(0);
        }, 1000);

        const lastRowNum = reviews.length > 0
            ? Math.max(...reviews.map(r => r.__rowNum__ || 0))
            : 0;

        if (input.length > 0) {
            const newreview = {
                Review: input,
                result: result,
                __rowNum__: lastRowNum + 1
            }
            setReviews(prev => [...prev, newreview]);
        }
        setResult('')
    };

    const handleminrotate = () => {
        setminrotate(180);
        setTimeout(() => {
            setminrotate(0);
        }, 1000);
        setInput('');
        setResult('');
        setselectedreview(null)
        if (itemdetail)
            itemdetail.__rowNum__ = -1
    };

    const handlearrowrot = () => {
        if (panelopen) {
            setarrowrot(180);
        }
        else {
            setarrowrot(0);
        }
    }

    const handleCheck = async (input, itemdetail) => {
        if (!input.trim()) return;

        setSlowResponse(false);  // Reset slow warning
        const timeout = setTimeout(() => {
            setSlowResponse(true);  // Show warning if >5 sec
        }, 2000);

        try {
            setLoading(true);
            const res = await axios.post('https://symentic-back.onrender.com/predict', {
                text: input,
            });
            setResult(res.data.prediction);

            const matchIndex = reviews.findIndex(item => item.__rowNum__ === itemdetail?.__rowNum__);

            if (matchIndex !== -1) {
                const updatedReviews = [...reviews]; // clone array
                updatedReviews[matchIndex] = {
                    ...updatedReviews[matchIndex],    // keep existing keys
                    result: res.data.prediction       // add/overwrite result
                };
                setReviews(updatedReviews);
            }

        } catch (error) {
            console.error('Error:', error);
            setResult('Error occurred.');
        } finally {
            setLoading(false);
            clearTimeout(timeout);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center text-slate-200 bg-black bg-[url('/bg.png')] bg-no-repeat bg-right bg-fixed bg-contain">
            {/* Navbar */}
            <nav className="fixed top-0 w-[100vw] flex justify-between items-center  bg-slate-900/80 text-white md:px-8 px-4 py-2 shadow-lg z-50">
                <div className="flex md:ml-7 ml-0 items-center gap-1">
                    <img src="/logo.png" className='h-13' />
                    <div className="flex flex-col items-start">
                        <span className="text-2xl font-extrabold text-amber-400 drop-shadow-md tracking-wide">Feedback</span>
                        <span className="text-2xl font-extrabold text-white drop-shadow-md tracking-wide">Filter</span>
                    </div>


                </div>

                <div className='flex items-center'>
                    <div className='absolute sm:relative left-1/4 sm:left-0 top-22 sm:top-0'>
                        <Link className='mr-5 border-b-1 text-xl border-green-400 px-3 py-1 hover:bg-green-600 active:bg-green-600 duration-300 transition-all rounded-md' to="/about">About</Link>
                        <Link className='mr-5 border-b-1 text-xl border-orange-400 px-3 py-1 hover:bg-orange-600 active:bg-orange-600 duration-300 transition-all rounded-md' to="/features">Features</Link>
                    </div>

                    <div>
                        <SignedOut>
                            <SignInButton>
                                <button className="cursor-pointer inline-block mr-2 sm:px-5 sm:py-2 px-2 py-1 rounded-lg bg-gradient-to-r from-gray-600 hover:-translate-y-0.5 to-gray-500 hover:from-gray-300 hover:to-gray-200 hover:text-gray-900 font-medium shadow transition-all">Sign In</button>
                            </SignInButton>
                            <SignUpButton>
                                <button className="cursor-pointer inline-block sm:px-5 sm:py-2 px-2 py-1 rounded-lg font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-500 transform hover:scale-[1.03] hover:-translate-y-0.5 shadow-lg transition-all">Sign Up</button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <div className='border-1 border-amber-400 px-1.5 py-1 bg-amber-300 rounded-[50%]'>
                                <UserButton />
                            </div>
                        </SignedIn>
                    </div>
                </div>
            </nav>

            <div className="flex  justify-between w-screen relative h-screen pt-15 px-10 ">
                {/* Main Card */}
                <div ref={cardref} className="bg-black/30 absolute sm:top-25 top-1/4 backdrop-blur-md text-slate-200 md:w-[38vw] w-[80%] p-4 md:pr-0 pr-2  rounded-2xl shadow-2xl hover:-translate-y-1 transition-transform duration-300 ease-in-out flex flex-col items-center border border-white/20">
                    <h1 className="text-2xl font-bold mb-3 text-white">Sentiment Analysis</h1>

                    <div className="flex w-full items-start">
                        <textarea
                            rows="6"
                            value={input}
                            onChange={(e) => { setInput(e.target.value); if (e.target.value.length === 0) setResult('') }}
                            disabled={selectedreview !== null}
                            placeholder="Enter your review..."
                            className="w-[90%] p-4 rounded-lg border border-slate-700 bg-slate-900/80 text-slate-200 text-base resize-none placeholder:text-slate-400 my-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        ></textarea>

                        <div className="lg:right-4 right-2 top-20  absolute flex flex-col gap-4 items-center">
                            <img
                                onClick={handleaddrotate}
                                src="/add.png"
                                className="cursor-pointer transition-transform duration-500 hover:scale-110"
                                style={{ transform: `rotate(${addrotate}deg)` }}
                                width={20}
                                alt="Add"
                            />
                            <img
                                onClick={handleminrotate}
                                src="/minus.png"
                                className="cursor-pointer transition-transform duration-500 hover:scale-110"
                                style={{ transform: `rotate(${minrotate}deg)` }}
                                width={20}
                                alt="Minus"
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => handleCheck(input)}
                        disabled={loading}
                        className="mt-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md"
                    >
                        {loading ? 'Analyzing...' : 'Check Sentiment'}
                    </button>

                    {(slowResponse && !result) && (
                        <p className="text-yellow-500 text-center mt-2 mr-3">⚠️ This might take a few seconds for the first time. Meanwhile, feel free to check out our About or Features pages!</p>
                    )}

                    {result && (
                        <div ref={resultRef}
                            className={`mt-3 text-lg p-4 w-full mr-3.5 text-center font-semibold rounded-md border  transition-all ${result === 'positive'
                                ? 'bg-emerald-900/60 text-emerald-300 border-emerald-500'
                                : 'bg-red-900/60 text-red-300 border-red-500'
                                }`}
                        >
                            <strong>{result.toUpperCase()} REVIEW</strong>
                        </div>
                    )}
                </div>

                {/* Review Panel */}

                <div className='absolute right-0 sm:top-25 top-[18vh]'>
                    <div className='border-slate-500 border-1 rounded-md mr-8 mb-2 p-2 '>

                        <img onClick={() => { handlearrowrot(); panelopen ? setpanelopen(false) : setpanelopen(true) }} ref={arrowRef}
                            style={{ transform: `rotate(${arrowrot}deg)`, transition: 'transform 0.5s ease' }}
                            className='h-[20px] cursor-pointer' src="/arrow.png" />
                    </div>

                    <div className="mr-8 fixed z-50 right-0 h-[70vh]  md:w-[40vw] w-[80vw]  pt-0 bg-black/40 border border-white/10 rounded-xl shadow-xl backdrop-blur text-slate-100 " ref={panelRef}>
                        <CustomerReviewPanel reviews={reviews}
                            setInput={setInput}
                            setResult={setResult}
                            setselectedreview={setselectedreview}
                            filename={filename}
                            check={handleCheck}
                            setitemdetail={setitemdetail}
                            setFilename={setFilename}
                            setReviews={setReviews} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;

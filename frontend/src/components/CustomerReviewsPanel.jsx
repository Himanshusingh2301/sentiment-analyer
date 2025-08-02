import React from 'react';
import * as XLSX from 'xlsx';
import ExportDropdown from './DownloadDropdown'

function CustomerReviewPanel({ check, filename, setFilename, reviews, setReviews, setInput, setitemdetail, setselectedreview }) {


    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFilename(file.name);


        const reader = new FileReader();
        const isCSV = file.name.endsWith('.csv');

        reader.onload = (event) => {
            let data = event.target.result;
            let workbook;

            if (isCSV) {
                workbook = XLSX.read(data, { type: 'string' });
            } else {
                const uint8Array = new Uint8Array(data);
                workbook = XLSX.read(uint8Array, { type: 'array' });
            }

            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const json = XLSX.utils.sheet_to_json(sheet);

            setReviews(json);

        };

        if (isCSV) {
            reader.readAsText(file);
        } else {
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div className=" ">
            {/* Sticky Header */}
            <div className="  w-full bg-black/40 backdrop-blur-4xl px-4 py-2 rounded-t-xl border-b border-white/10">
                <h2 className="text-2xl text-white mb-3 font-semibold">📤 Upload Reviews File</h2>

                <div className="flex items-center justify-between">
                    <div className="flex items-center ">

                        <input
                            type="file"
                            accept=".xlsx, .xls, .csv"
                            id="file-upload"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer border-slate-400 border-1   bg-slate-900 md:text-md text-sm text-white md:px-2 md:py-2 px-1 py-1 md:mr-3 mr-1 rounded-md hover:bg-slate-800 transition duration-300 shadow-md"
                        >
                            <span className='flex flex-col md:flex-row'>Upload File <span> (.xlsx/.csv)</span></span>
                        </label>

                        {filename && (
                            <span className="bg-green-800 text-white text-sm px-3 py-1 md:mr-2 mr-0 rounded-md">
                                {filename}
                            </span>
                        )}
                        {(reviews.length > 0 || filename) && (

                            <img onClick={() => {
                                if (window.confirm('Do you want to clear all reviews?')) {
                                    localStorage.removeItem('filename'); localStorage.removeItem('reviews'); window.location.reload()
                                }
                            }
                            }
                                src="/cross.png" className='h-[24px] cursor-pointer' />
                        )}

                    </div>
                    <div>
                        <ExportDropdown reviews={reviews} />
                    </div>
                </div>

            </div>

            <div className=' p-5 pt-0 absolute h-[75%] w-full bottom-0 overflow-y-scroll scrollbar-thin  scrollbar-thumb-slate-600 scrollbar-track-transparent'>
                {/* Review List */}
                {reviews.length > 0 && (
                    <div className="mt-6 space-y-4">
                        <h3 className="text-white font-medium text-lg">📋 Customer Reviews:</h3>
                        {reviews.map((item, index) => (
                            <div
                                key={index}
                                className="border border-white/10 bg-white/5 rounded-lg p-3 cursor-pointer text-slate-100 hover:bg-black transition-all ease-in"
                            >
                                <div className='flex justify-between'>
                                    <p >{item.Review}</p>
                                    {item.result ? (
                                        <p className={item.result === 'positive' ? 'text-emerald-300' : 'text-red-300'}>
                                            {item.result.toUpperCase()}
                                        </p>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                check(item.Review,item);
                                                setInput(item.Review)
                                                setselectedreview(item.Review)
                                                setitemdetail(item)
                                            }}
                                            className="bg-green-700 text-white cursor-pointer md:px-2 px-1 py-0.5 md:py-1 rounded">
                                            Check
                                        </button>
                                    )}

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomerReviewPanel;

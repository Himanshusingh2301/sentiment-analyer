import React, { useState, useRef, useEffect } from 'react';
import { unparse } from 'papaparse';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { gsap } from 'gsap';

const ExportDropdown = ({ reviews }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        if (open) {
            gsap.fromTo(
                dropdownRef.current,
                { opacity: 0, y: -10, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [open]);

    // CSV
    const downloadCSV = () => {
        const csv = unparse(reviews);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'reviews.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Excel
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(reviews);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Reviews');
        XLSX.writeFile(workbook, 'reviews.xlsx');
    };

    // PDF
    const downloadPDF = () => {
        const doc = new jsPDF();

        const tableData = reviews.map((review, i) => [
            i + 1,
            review.Review || '',
            review.result || '',
        ]);

        doc.text('Review Report', 14, 16);

        autoTable(doc, {
            head: [['#', 'Review Content', 'Result']],
            body: tableData,
            startY: 20,
        });

        doc.save('reviews.pdf');
    };


    return (
        <div className="relative inline-block text-left">
            {reviews.length > 0 && (
                <img src='/down.png'
                    onClick={() => setOpen(!open)}
                    className={`cursor-pointer transition-all ease ${open ? `rotate-180 duration-300` : `rotate-0 duration-300`}`}
                />
            )}

            {open && (
                <div ref={dropdownRef} className="absolute mt-2 w-48 right-0 z-10 rounded-md shadow-lg bg-black/10 ring-1 ring-black backdrop-blur-lg">
                    <div className="">
                        <button
                            onClick={() => { downloadCSV(); setOpen(false); }}
                            className="w-full px-4 py-2 text-left text-slate-200 cursor-pointer hover:bg-black hover:text-white transition"
                        >
                            📄 Export as CSV
                        </button>
                        <button
                            onClick={() => { downloadExcel(); setOpen(false); }}
                            className="w-full px-4 py-2 text-left text-slate-200 cursor-pointer hover:bg-black hover:text-white  transition"
                        >
                            📊 Export as Excel
                        </button>
                        <button
                            onClick={() => { downloadPDF(); setOpen(false); }}
                            className="w-full px-4 py-2 text-left text-slate-200 cursor-pointer hover:bg-black hover:text-white transition"
                        >
                            🧾 Export as PDF
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExportDropdown;

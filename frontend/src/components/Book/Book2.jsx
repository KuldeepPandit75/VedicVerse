import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { pdfjs } from "react-pdf";
import { useLocation } from "react-router-dom";
// import LeafComponents from "./leaf";
// import pdfFile from `/books/${samved}.pdf`

const pdfFiles = {
  samved: "/books/samved.pdf",
  rigved: "/books/rigved.pdf",
  yajurved: "/books/yajurved.pdf",
};

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = () => {
  const location = useLocation();
  const selectedBook = location.state || {};
  const pdfFile = pdfFiles[selectedBook.bookName];

  const [numPages, setNumPages] = useState(0);
  const [pageImages, setPageImages] = useState([]); // Array to store rendered pages
  const [loadedPages, setLoadedPages] = useState(new Set()); // Set to track loaded pages
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const bookRef = useRef(null);
  const bufferPages = 4; // Number of pages to preload on each side

  // Function to render a specific page
  const renderPage = async (pdf, pageNumber) => {
    if (loadedPages.has(pageNumber)) return; // Skip if already loaded

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });

    canvas.width = viewport.width;
    canvas.height = viewport.height;
    context.fillStyle = "#000"; // Light beige background
    context.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvasContext: context,
      viewport,
      background: "rgba(0, 0, 0,0)",
    }).promise;

    setPageImages((prev) => {
      const updatedImages = [...prev];
      updatedImages[pageNumber - 1] = canvas.toDataURL();
      return updatedImages;
    });

    setLoadedPages((prev) => new Set(prev).add(pageNumber)); // Mark page as loaded
  };

  // Function to handle loading visible and adjacent pages
  const loadVisiblePages = async (pdf) => {
    const startPage = Math.max(currentPage - bufferPages, 1);
    const endPage = Math.min(currentPage + bufferPages, pdf.numPages);

    for (let i = startPage; i <= endPage; i++) {
      await renderPage(pdf, i);
    }
  };

  useEffect(() => {
    const loadPdf = async () => {
      const pdf = await pdfjs.getDocument(pdfFile).promise;
      setNumPages(pdf.numPages);
      setPageImages(new Array(pdf.numPages).fill(null)); // Initialize array with placeholders
      await loadVisiblePages(pdf); // Load initial visible pages
    };

    loadPdf().catch((error) => console.error("Error loading PDF:", error));
  }, []);

  useEffect(() => {
    const loadPdf = async () => {
      const pdf = await pdfjs.getDocument(pdfFile).promise;
      await loadVisiblePages(pdf); // Load pages on currentPage change
    };

    loadPdf();
  }, [currentPage]); // Re-run when currentPage changes

  // Handle page changes from the flipbook
  const onFlip = (e) => {
    const pageIndex = e.data; // Get the page index from the flipbook
    setCurrentPage(pageIndex + 1); // Update the current page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#d4bb9a] to-[#ce9a5e] py-10">
      {/* <div className="absolute inset-0 z-0">
        <LeafComponents />
      </div> */}
      {pageImages.length > 0 ? (
        <HTMLFlipBook
          ref={bookRef}
          width={400}
          height={600}
          size="fixed"
          minWidth={300}
          maxWidth={800}
          minHeight={450}
          maxHeight={1000}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="demo-book"
          style={{ gap: "50px" }}
          flippingTime={1000}
          drawShadow={true}
          onFlip={onFlip} // Trigger page tracking on flip
        >
          {/* Cover Page */}
          <div className="page-content bg-gradient-to-br from-[#8B4513] to-[#654321] rounded-lg p-6 flex items-center justify-center">
            <h2 className="text-3xl font-bold">Cover Page</h2>
          </div>

          {/* Render PDF Pages */}
          {pageImages.map((src, index) => (
            <div
              key={index}
              className="page-content bg-[#efe2cf] rounded-lg p-6 flex flex-col items-center justify-center"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {src ? (
                <>
                  <div className="absolute inset-4 border-[3px] border-[#d4af37]" />
                  <div className="absolute inset-6 border-[1px] border-[#d4af37]" />
                  <div className=" flex items-center justify-center gap-2  z-10  relative">
                    <img src="/left3.png" className="w-28  h-14 " alt="" />
                    <img
                      src="om2.png"
                      alt="Om"
                      className="w-14 h-42 transform hover:rotate-180 transition-transform duration-1000"
                    />
                    <img
                      src="/left5.png"
                      className="w-28 h-14 rotate-180"
                      alt=""
                    />
                  </div>
                  <img
                    src={src}
                    alt={`Page ${index + 1}`}
                    className="w-full h-full object-contain relative -top-12 z-0"
                  />
                  <div className="footer text-center  relative">
                    <div className="absolute left-0 right-0 -top-2 transform -translate-y-1/2">
                      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                    </div>
                    <div className="relative inline-block -top-[68px]">
                      <span className="inline-block px-8 py-1 text-lg text-[#8B4513] border-2 border-[#d4af37] rounded-full bg-[#fff9f0] relative z-10">
                        पृष्ठ {index + 1} / {pageImages.length}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <p>Loading Page {index + 1}...</p>
              )}
            </div>
          ))}
        </HTMLFlipBook>
      ) : (
        <p className="text-lg font-semibold">Loading PDF...</p>
      )}
    </div>
  );
};

export default PDFViewer;

import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { pdfjs } from "react-pdf";
import { useLocation } from "react-router-dom";
import stripeTexture from "/public/stripe.png";

const pdfFiles = {
  samved: "/books/samved.pdf",
  rigved: "/books/rigved.pdf",
  yajurved: "/books/yajurved.pdf",
  arthved: "/books/arthved-part-1.pdf",
  gita: "/books/bhagwat-git.pdf",
  bhagwat: "/books/bhagwat-puran.pdf",
  nard: "/books/nard-puran.pdf",
  shiv: "/books/shiv-puran.pdf",
  vaman: "/books/vamanouran.pdf",
  vishnu: "/books/vishnu-puran.pdf",
};

const coverPhoto = {
  samved: "/cover/samved.jpeg",
  rigved: "/cover/rigved.jpeg",
  yajurved: "/cover/yajurved.jpeg",
  arthved: "/cover/arthved.jpeg",
  gita: "/cover/gita.jpeg",
  bhagwat: "/cover/bhagwat.jpeg",
  nard: "/cover/narad.jpeg",
  shiv: "/cover/shiv.jpeg",
  vaman: "/cover/vaman.jpeg",
  vishnu: "/cover/vishnu.jpeg",
};

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = () => {
  const location = useLocation();
  const selectedBook = location.state || {};
  const pdfFile = pdfFiles[selectedBook.bookName];
  const cover = coverPhoto[selectedBook.bookName];

  const [numPages, setNumPages] = useState(0);
  const [pageImages, setPageImages] = useState([]);
  const [loadedPages, setLoadedPages] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [bookMarked, setBookMarked] = useState(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
    return storedBookmarks[selectedBook.bookName] || 0;
  });

  const bookRef = useRef(null);
  const bufferPages = 4;

  useEffect(() => {
    const loadPdf = async () => {
      const pdf = await pdfjs.getDocument(pdfFile).promise;
      setNumPages(pdf.numPages);
      setPageImages(new Array(pdf.numPages).fill(null));
      await loadVisiblePages(pdf);
    };

    loadPdf().catch((error) => console.error("Error loading PDF:", error));
  }, [pdfFile]);

  const renderPage = async (pdf, pageNumber) => {
    if (loadedPages.has(pageNumber)) return;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: context, viewport }).promise;
    setPageImages((prev) => {
      const updatedImages = [...prev];
      updatedImages[pageNumber - 1] = canvas.toDataURL();
      return updatedImages;
    });
    setLoadedPages((prev) => new Set(prev).add(pageNumber));
  };

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
      setPageImages(new Array(pdf.numPages).fill(null));
      await loadVisiblePages(pdf);
    };

    loadPdf().catch((error) => console.error("Error loading PDF:", error));
  }, []);

  useEffect(() => {
    const loadPdf = async () => {
      const pdf = await pdfjs.getDocument(pdfFile).promise;
      await loadVisiblePages(pdf);
    };

    loadPdf();
  }, [currentPage]);
  // Handle page changes from the flipbook
  const onFlip = (e) => {
    const pageIndex = e.data;
    setBookMarked(pageIndex);
    setCurrentPage(pageIndex + 1);
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
    storedBookmarks[selectedBook.bookName] = pageIndex;
    localStorage.setItem("bookmarks", JSON.stringify(storedBookmarks));

    console.log("Bookmarked Page:", pageIndex);
  };
  const goToBookmarkedPage = () => {
    console.log("Flipping to bookmarked page:", bookMarked);
    bookRef.current.pageFlip().flip(parseInt(bookMarked, 10));
  };

  // tongle page button
  const flipToPrevPage = () => {
    bookRef.current.pageFlip().flipPrev();
  };
  const flipToNextPage = () => {
    bookRef.current.pageFlip().flipNext();
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#d4bb9a] to-[#ce9a5e] py-10 px-4">
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
          className="demo-book w-full max-w-md md:max-w-lg lg:max-w-2xl"
          style={{ gap: "20px" }}
          flippingTime={1500}
          drawShadow={true}
          onFlip={(e) => onFlip(e)}
        >
          {/* Cover Page */}
          <div className="bg-gradient-to-br from-[#b79278] to-[#a77747] rounded-lg p-4 flex items-center justify-center">
            <img
              className="w-full h-auto rounded-lg"
              src={cover}
              alt="coverPage"
            />
          </div>

          {/* PDF Pages */}
          {pageImages.map((src, index) => (
            <div
              key={index}
              className="page-content bg-[#efe2cf] rounded-lg p-4 flex flex-col items-center justify-center"
            >
              {src ? (
                <img
                  src={src}
                  alt={`Page ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <p>Loading Page {index + 1}...</p>
              )}
            </div>
          ))}
        </HTMLFlipBook>
      ) : (
        <p className="text-lg font-semibold">Loading PDF...</p>
      )}

      <div className="flex gap-20 -mt-20">
        <button
          className=" tongleButton md:absolute md:left-16 md:top-1/2 w-20 h-20 z-20 transform -translate-y-1/2 text-white bg-[#9c511cf0] p-3 rounded-full  hover:bg-[#8B4513]"
          onClick={() => flipToPrevPage()}
        >
          ←
        </button>

        <button
          className=" tongleButton  md:absolute md:right-16 md:top-1/2 w-20 h-20 z-20 transform -translate-y-1/2 text-white bg-[#9c511cf0] p-3 rounded-full  hover:bg-[#8B4513]"
          onClick={() => flipToNextPage()}
        >
          →
        </button>
      </div>

      <div className=" z-20 absolute top-0 right-16 cursor-pointer ">
        <div onClick={() => goToBookmarkedPage()}>
          <img
            className="w-[100px] h-[200px]"
            src={stripeTexture}
            alt="error"
          />
        </div>

        <div className="absolute top-20 right-7 bg-[#efe2cf81] w-9 h-10 z-10 text-center text-4xl flex justify-center items-center">
          {bookMarked}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;

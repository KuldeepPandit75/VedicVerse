import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { pdfjs } from "react-pdf";
import { useLocation } from "react-router-dom";
import stripeTexture from "/stripe.png";
import { MdZoomIn } from "react-icons/md";
import { MdZoomOut } from "react-icons/md";

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
  samved:
    "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241086/samved_rvrezh.jpg",
  rigved:
    "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241086/rigved_o7vkdb.jpg",
  yajurved:
    "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241090/yajurved_lumlob.jpg",
  arthved:
    "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241084/arthved_j1c9qe.jpg",
  gita: "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241086/gita_xkwztu.jpg",
  bhagwat:
    "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241084/bhagwat_jjybi7.jpg",
  nard: "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241085/narad_pdlkpn.jpg",
  shiv: "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241087/shiv_epdpzb.jpg",
  vaman:
    "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241087/vaman_nnzwwl.jpg",
  vishnu:
    "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241092/vishnu_ibaain.jpg",
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

  const [zoomLevel, setZoomLevel] = useState(1);

  const zoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.2, 2)); // Limit max zoom to 2x
  };

  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.2, 0.8)); // Limit min zoom to 0.8x
  };

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

    // console.log("Bookmarked Page:", pageIndex);
  };
  const goToBookmarkedPage = () => {
    // console.log("Flipping to bookmarked page:", bookMarked);
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
    <div className="min-h-screen flex flex-col overflow-hidden items-center justify-center bg-gradient-to-b from-[#d4bb9a] to-[#ce9a5e] py-10 px-4">
      {pageImages.length > 0 ? (
        <HTMLFlipBook
          ref={bookRef}
          width={400 * zoomLevel}
          height={600 * zoomLevel}
          size="fixed"
          minWidth={300}
          maxWidth={800}
          minHeight={450}
          maxHeight={1000}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="demo-book w-full max-w-md md:max-w-lg lg:max-w-2xl"
          style={{
            gap: "20px",
            transform: `scale(${zoomLevel})`,
            transformOrigin: "center",
          }}
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
                <>
                  <div className=" flex items-center justify-center gap-2  z-10  relative">
                    <img
                      src="https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241103/left3_benhox.png"
                      className="w-28  h-14 "
                      alt=""
                    />
                    <img
                      src="om2.png"
                      alt="Om"
                      className="w-14 h-42 transform hover:rotate-180 transition-transform duration-1000"
                    />
                    <img
                      src="https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241100/left5_gz0hfg.png"
                      className="w-28 h-14 rotate-180"
                      alt=""
                    />
                  </div>
                  <img
                    src={src}
                    alt={`Page ${index + 1}`}
                    className="w-full h-full object-contain relative -top-12 z-0"
                  />
                  <div className="z-0 absolute top-0 left-0">
                    <img
                      className="h-[600px]"
                      src="https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241083/border3_x1yp3c.webp"
                      alt="error"
                    />
                  </div>
                  <div className="footer text-center  relative">
                    <div className="absolute left-0 right-0 -top-2 transform -translate-y-1/2"></div>
                    <div className="relative inline-block -top-20">
                      <span className="inline-block px-8 py-2 text-lg text-[#8B4513] border-2 border-[#d4af37] rounded-full bg-[#fff9f0] relative z-10">
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
      <div className="flex gap-4 mt-4 z-10">
        <button
          onClick={zoomIn}
          className="  px-1 left-[670px] bottom-6 absolute text-2xl text-black rounded"
        >
          <MdZoomIn />
        </button>
        <button
          onClick={zoomOut}
          className="px-1 text-2xl absolute bottom-6 text-black rounded"
        >
          <MdZoomOut />
        </button>
      </div>

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
      <div className="absolute bottom-0 right-10">
        <p className="text-xl">
          source:{" "}
          <a target="_blank" href="https://vedicheritage.gov.in/">
            https://vedicheritage.gov.in/
          </a>
        </p>
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

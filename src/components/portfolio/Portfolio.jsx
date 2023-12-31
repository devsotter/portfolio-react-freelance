import React, { useEffect, useState } from "react";
import PortfolioList from "../portfolioList/PortfolioList";
import "./portfolio.scss";
import { pixelPortfolio, digitalPortfolio } from "../../data";

export default function Portfolio() {
  const [selected, setSelected] = useState("pixel");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const list = [
    {
      id: "pixel",
      title: "Pixel Art",
    },
    {
      id: "digital",
      title: "Digital Art",
    },
  ];

  useEffect(() => {
    switch (selected) {
      case "pixel":
        setData(pixelPortfolio);
        break;
      case "digital":
        setData(digitalPortfolio);
        break;
      default:
        setData([]);
    }
  }, [selected]);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const toggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  return (
    <div className="tudo">
      <div className="portfolio" id="portfolio">
        <div className="nav-port">
          <h1>Portfolio</h1>
          <ul>
            {list.map((item) => (
              <PortfolioList
                key={item.id}
                title={item.title}
                active={selected === item.id}
                setSelected={setSelected}
                id={item.id}
              />
            ))}
          </ul>
        </div>
        <div className="container">
          {data.slice(0, showMore ? data.length : 12).map((d, index) => (
            <div className={`item${showMore ? " show" : ""}`} key={index}>
              <img
                src={d.img}
                alt="imagem"
                onClick={() => openModal(index)}
              />
              <h3>{d.title}</h3>
            </div>
          ))}
        </div>
        {/* Show "Ver Mais" or "Esconder" button */}
        {data.length > 12 && (
          <button className="ver-mais" onClick={toggleShowMore}>
            {showMore ? "Esconder" : "Ver Mais"}
          </button>
        )}
        {showModal && (
          <div className="modal-slide">
            <button className="close" onClick={closeModal}>
              Close
            </button>
            <div className="modal-content">
              <img src={data[currentImageIndex].img} alt="imagem" />
              <h3>{data[currentImageIndex].title}</h3>
            </div>
            <div className="slider-controls">
              <button onClick={prevSlide}>
                <img src="./assets/arrow.png" alt="svg seta para esquerda" />
              </button>
              <button onClick={nextSlide}>
                <img src="./assets/arrow.png" alt="svg seta para direita" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

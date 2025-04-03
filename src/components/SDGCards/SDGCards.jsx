import React from "react";
import "./SDGCards.css";

const sdgs = [
  { id: 1, title: "No Poverty", description: "End poverty in all its forms everywhere.", image: "/images/sdg1.png" },
  { id: 2, title: "Zero Hunger", description: "End hunger, achieve food security and improved nutrition.", image: "/images/sdg2.png" },
  { id: 3, title: "Good Health and Well-being", description: "Ensure healthy lives and promote well-being for all.", image: "/images/sdg3.png" },
  { id: 4, title: "Quality Education", description: "Ensure inclusive and equitable quality education.", image: "/images/sdg4.png" },
  { id: 5, title: "Gender Equality", description: "Achieve gender equality and empower all women and girls.", image: "/images/sdg5.png" },
  { id: 6, title: "Clean Water and Sanitation", description: "Ensure availability and sustainable management of water.", image: "/images/sdg6.png" },
  { id: 7, title: "Affordable and Clean Energy", description: "Ensure access to affordable, reliable, sustainable energy.", image: "/images/sdg7.png" },
  { id: 8, title: "Decent Work and Economic Growth", description: "Promote sustained economic growth and decent work.", image: "/images/sdg8.png" },
  { id: 9, title: "Industry, Innovation and Infrastructure", description: "Build resilient infrastructure and promote innovation.", image: "/images/sdg9.png" },
  { id: 10, title: "Reduced Inequalities", description: "Reduce inequality within and among countries.", image: "/images/sdg10.png" },
  { id: 11, title: "Sustainable Cities and Communities", description: "Make cities and human settlements inclusive.", image: "/images/sdg11.png" },
  { id: 12, title: "Responsible Consumption and Production", description: "Ensure sustainable consumption and production.", image: "/images/sdg12.png" },
  { id: 13, title: "Climate Action", description: "Take urgent action to combat climate change.", image: "/images/sdg13.png" },
  { id: 14, title: "Life Below Water", description: "Conserve and sustainably use the oceans.", image: "/images/sdg14.png" },
  { id: 15, title: "Life on Land", description: "Protect, restore and promote sustainable ecosystems.", image: "/images/sdg15.png" },
  { id: 16, title: "Peace, Justice and Strong Institutions", description: "Promote peaceful and inclusive societies.", image: "/images/sdg16.png" },
  { id: 17, title: "Partnerships for the Goals", description: "Strengthen global partnerships for sustainable development.", image: "/images/sdg17.png" }
];

const SDGCards = () => {
  return (
    <div className="sdg-container">
      {sdgs.map((sdg) => (
        <div key={sdg.id} className="sdg-card">
          <img src={sdg.image} alt={sdg.title} className="sdg-image" />
          <h3>{sdg.title}</h3>
          <p>{sdg.description}</p>
          <button className="sdg-button">Learn More</button>
        </div>
      ))}
    </div>
  );
};

export default SDGCards;

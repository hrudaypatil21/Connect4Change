import React from "react";
import "./SDGCards.css";

const sdgs = [
  { id: 1, title: "No Poverty", description: "End poverty in all its forms everywhere.", image: "src/assets/images/No Poverty.png" },
  { id: 2, title: "Zero Hunger", description: "End hunger, achieve food security and improved nutrition.", image: "src/assets/images/Zero Hunger.png" },
  { id: 3, title: "Good Health and Well-being", description: "Ensure healthy lives and promote well-being for all.", image: "src/assets/images/Good Health and Well-being.png" },
  { id: 4, title: "Quality Education", description: "Ensure inclusive and equitable quality education.", image: "src/assets/images/Quality Education.png" },
  { id: 5, title: "Gender Equality", description: "Achieve gender equality and empower all women and girls.", image: "src/assets/images/Gender Equality.png" },
  { id: 6, title: "Clean Water and Sanitation", description: "Ensure availability and sustainable management of water.", image: "src/assets/images/Clean Water and Sanitation.png" },
  { id: 7, title: "Affordable and Clean Energy", description: "Ensure access to affordable, reliable, sustainable energy.", image: "src/assets/images/Affordable and Clean Energy.png" },
  { id: 8, title: "Decent Work and Economic Growth", description: "Promote sustained economic growth and decent work.", image: "src/assets/images/Decent Work and Economic Growth.png" },
  { id: 9, title: "Industry, Innovation and Infrastructure", description: "Build resilient infrastructure and promote innovation.", image: "src/assets/images/Industry, Innovation and InfrastructureIndustry, Innovation and Infrastructure.png" },
  { id: 10, title: "Reduced Inequalities", description: "Reduce inequality within and among countries.", image: "src/assets/images/Reduced Inequalities.png" },
  { id: 11, title: "Sustainable Cities and Communities", description: "Make cities and human settlements inclusive.", image: "src/assets/images/Sustainable Cities and Communities.png" },
  { id: 12, title: "Responsible Consumption and Production", description: "Ensure sustainable consumption and production.", image: "src/assets/images/Responsible Consumption and Production.png" },
  { id: 13, title: "Climate Action", description: "Take urgent action to combat climate change.", image: "src/assets/images/Climate ActionClimate Action.png" },
  { id: 14, title: "Life Below Water", description: "Conserve and sustainably use the oceans.", image: "src/assets/images/Life Below Water.png" },
  { id: 15, title: "Life on Land", description: "Protect, restore and promote sustainable ecosystems.", image: "src/assets/images/Life on Land.png" },
  { id: 16, title: "Peace, Justice and Strong Institutions", description: "Promote peaceful and inclusive societies.", image: "src/assets/images/Peace, Justice and Strong Institutions.png" },
  { id: 17, title: "Partnerships for the Goals", description: "Strengthen global partnerships for sustainable development.", image: "src/assets/images/Partnerships for the Goals.png" }
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
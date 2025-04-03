import React from "react";
import "./NGOS.css";

const NGOs = () => {
    const ngos = [
        {
            name: "Helping Hands",
            description: "Providing education and shelter for underprivileged children.",
            link: "#",
            image: "https://via.placeholder.com/150",
            details: "Helping Hands focuses on providing quality education and safe shelter to children in need. They have impacted over 10,000 lives across the globe.",
        },
        {
            name: "Green Earth",
            description: "Working towards environmental conservation and sustainability.",
            link: "#",
            image: "https://via.placeholder.com/150",
            details: "Green Earth is dedicated to planting trees, reducing pollution, and promoting sustainable living practices.",
        },
        {
            name: "Food for All",
            description: "Ensuring no one sleeps hungry by distributing meals daily.",
            link: "#",
            image: "https://via.placeholder.com/150",
            details: "Food for All has distributed over 1 million meals to those in need, ensuring food security for vulnerable communities.",
        },
        {
            name: "Health First",
            description: "Providing free medical checkups and healthcare services.",
            link: "#",
            image: "https://via.placeholder.com/150",
            details: "Health First organizes free medical camps and provides essential healthcare services to underprivileged areas.",
        },
        {
            name: "Bright Futures",
            description: "Empowering youth through skill development programs.",
            link: "#",
            image: "https://via.placeholder.com/150",
            details: "Bright Futures offers vocational training and mentorship programs to help young individuals achieve their dreams.",
        },
        {
            name: "Clean Water Initiative",
            description: "Providing access to clean and safe drinking water.",
            link: "#",
            image: "https://via.placeholder.com/150",
            details: "Clean Water Initiative has built over 500 wells and water purification systems in remote areas.",
        },
        {
            name: "Animal Rescue Alliance",
            description: "Rescuing and rehabilitating abandoned and injured animals.",
            link: "#",
            image: "https://via.placeholder.com/150",
            details: "Animal Rescue Alliance has saved thousands of animals and provided them with loving homes.",
        },
        {
            name: "Tech for Good",
            description: "Bridging the digital divide by providing technology access.",
            link: "#",
            image: "https://via.placeholder.com/150",
            details: "Tech for Good donates devices and offers digital literacy programs to underserved communities.",
        },
    ];

    return (
        <div className="ngos-container">
            <h1 className="ngos-title">NGOs Making a Difference</h1>
            <div className="ngos-list">
                {ngos.map((ngo, index) => (
                    <div key={index} className="ngo-card">
                        <img src={ngo.image} alt={ngo.name} className="ngo-image" />
                        <h2>{ngo.name}</h2>
                        <p>{ngo.description}</p>
                        <p>{ngo.details}</p>
                        <a href={ngo.link} className="ngo-link">Learn More</a>
                        {/* <button className="ngo-button">View Profile</button> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NGOs;

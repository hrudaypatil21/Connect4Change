import React from "react";
import "./signIn.css";

export default function SignUp() {
    return (
        <div className="signup-container">
            <section>
                <h3 className="signup-title">Choose your sign up method</h3>
                <div className="signup-options">
                    <a className="signup-option" href="/signup/individual-registration">
                        Individual
                    </a>
                    <a className="signup-option" href="/signup/ngo-registration">
                        NGO
                    </a>
                    <a className="login" href="#" >Already a member? Login.</a>
                </div>
            </section>
        </div>
    );
}
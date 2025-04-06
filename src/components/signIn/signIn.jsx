import React from "react";
import { Link } from "react-router-dom";
import "./signUp.css";

export default function SignUp() {
    return (
        <div className="signup-container">
            <section>
                <h3 className="signup-title">Login As Individual or Ngo</h3>
                <div className="signup-options">
                    <Link className="signup-option" to="/login-individual">
                        Individual
                    </Link>
                    <Link className="signup-option" to="/login-ngo">
                        NGO
                    </Link>
                    {/* <Link className="login" to="/login-individual">Already a member? Login.</Link> */}
                </div>
            </section>
        </div>
    );
}

import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false,
            recaptcha: false
        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    recaptchaHandler = e => {
        this.setState({ error: "" });
        let userDay = e.target.value.toLowerCase();
        let dayCount;

        if (userDay === "sunday") {
            dayCount = 0;
        } else if (userDay === "monday") {
            dayCount = 1;
        } else if (userDay === "tuesday") {
            dayCount = 2;
        } else if (userDay === "wednesday") {
            dayCount = 3;
        } else if (userDay === "thursday") {
            dayCount = 4;
        } else if (userDay === "friday") {
            dayCount = 5;
        } else if (userDay === "saturday") {
            dayCount = 6;
        }

        if (dayCount === new Date().getDay()) {
            this.setState({ recaptcha: true });
            return true;
        } else {
            this.setState({
                recaptcha: false
            });
            return false;
        }
    };

    clickSubmit = event => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        };
        // console.log(user);
        if (this.state.recaptcha) {
            signup(user).then(data => {
                if (data.error) this.setState({ error: data.error });
                else
                    this.setState({
                        error: "",
                        name: "",
                        email: "",
                        password: "",
                        open: true
                    });
            });
        } else {
            this.setState({
                error: "What day is today? Please write a correct answer!"
            });
        }
    };

    signupForm = (name, email, password, recaptcha) => (
        <form className="m-0 p-0">
            <div className="form-group">
                <label className="text-primary m-0">Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control border border-secondary"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-primary m-0">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control border border-secondary"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-primary m-0">Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control border border-secondary"
                    value={password}
                />
            </div>

            <div className="form-group">
                <label className="text-primary m-0">
                    {recaptcha ? "Thanks. You got it!" : "What day is today?"}
                </label>

                <input
                    onChange={this.recaptchaHandler}
                    type="text"
                    className="form-control border border-secondary"
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary mb-2"
            >
                Submit
            </button>
        </form>
    );

    render() {
        const { name, email, password, error, open, recaptcha } = this.state;
        return (
            <div className="container">
                <h5 className="mt-5 p-0">Signup to <strong className="text-primary">Blogify</strong></h5>
                <p><pre><i>   "where we are connecting ideas and people"</i></pre></p>
                
                

                <hr />
                <SocialLogin />

                <hr />
                <br />

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div
                    className="alert alert-info"
                    style={{ display: open ? "" : "none" }}
                >
                    New account is successfully created. Please{" "}
                    <Link to="/signin" className="text-danger">Sign In</Link>.
                </div>

                {this.signupForm(name, email, password, recaptcha)}
            </div>
        );
    }
}

export default Signup;

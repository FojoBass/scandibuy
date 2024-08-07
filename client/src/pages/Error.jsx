import { Component } from "react";
import { Link } from "react-router-dom";

class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <section className="error_sect">
                <h1>404</h1>
                {this.props.message ? (
                    <h3>{this.props.message}</h3>
                ) : (
                    <>
                        <h3>Page not found!</h3>
                        <Link to="/">Return home</Link>
                    </>
                )}
            </section>
        );
    }
}

export default Error;

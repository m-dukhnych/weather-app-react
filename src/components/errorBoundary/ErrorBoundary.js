import { Component } from "react";

class ErrorBoundery extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({error: true});
    }

    render() {
        if (this.state.error) {
            return <h2>Something went wrong...</h2>
        }

        return this.props.children; 
    }

}

export default ErrorBoundery;
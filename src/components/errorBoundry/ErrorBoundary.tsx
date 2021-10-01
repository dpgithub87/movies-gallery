import { Button } from "@mui/material";
import { Component } from "react";
import { ErrorBoundaryStateType } from "../../types/types";

class ErrorBoundary extends Component<any, ErrorBoundaryStateType> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
            <h1 className="global-error">OOOps!</h1>
            <h3>Something went wrong.</h3>
            <Button 
                variant="contained" 
                onClick={() => {
                    window.location.href = "/";}}>Back to Home</Button>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

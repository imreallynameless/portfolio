import React from "react";
import styled from "styled-components";
import { PageLayout, PageHeading, BodyText, Button } from "./SharedStyledComponents";

const ErrorContainer = styled.div`
  text-align: center;
  padding: 40px 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.6;
`;

const ErrorActions = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallbackMessage?: string;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught by boundary:", error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleGoHome = (): void => {
    window.location.href = "/";
  };

  render(): React.ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallbackMessage } = this.props;

    if (hasError) {
      return (
        <PageLayout>
          <ErrorContainer>
            <ErrorIcon>⚠️</ErrorIcon>
            <PageHeading style={{ fontSize: "3rem", marginBottom: "20px" }}>
              Oops! Something went wrong
            </PageHeading>
            <BodyText style={{ marginBottom: "20px" }}>
              {fallbackMessage ||
                "We're sorry, but something unexpected happened. Please try refreshing the page or go back to the home page."}
            </BodyText>

            {process.env.NODE_ENV === "development" && error && errorInfo && (
              <details
                style={{
                  marginTop: "20px",
                  textAlign: "left",
                  background: "#f5f5f5",
                  padding: "15px",
                  borderRadius: "8px",
                  fontSize: "1.2rem",
                }}
              >
                <summary style={{ cursor: "pointer", marginBottom: "10px" }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{ fontSize: "1rem", overflow: "auto" }}>
                  {error.toString()}
                  <br />
                  {errorInfo.componentStack}
                </pre>
              </details>
            )}

            <ErrorActions>
              <Button onClick={this.handleReload}>Refresh Page</Button>
              <Button onClick={this.handleGoHome} style={{ backgroundColor: "#6c757d" }}>
                Go Home
              </Button>
            </ErrorActions>
          </ErrorContainer>
        </PageLayout>
      );
    }

    return children;
  }
}

export default ErrorBoundary;


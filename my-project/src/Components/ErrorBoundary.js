import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PageLayout, PageHeading, BodyText, Button } from './SharedStyledComponents';

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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console for debugging
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Here you could also log to an error reporting service
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <PageLayout>
          <ErrorContainer>
            <ErrorIcon>⚠️</ErrorIcon>
            <PageHeading style={{ fontSize: '3rem', marginBottom: '20px' }}>
              Oops! Something went wrong
            </PageHeading>
            <BodyText style={{ marginBottom: '20px' }}>
              {this.props.fallbackMessage || 
                "We're sorry, but something unexpected happened. Please try refreshing the page or go back to the home page."
              }
            </BodyText>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ 
                marginTop: '20px', 
                textAlign: 'left', 
                background: '#f5f5f5', 
                padding: '15px', 
                borderRadius: '8px',
                fontSize: '1.2rem'
              }}>
                <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{ fontSize: '1rem', overflow: 'auto' }}>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <ErrorActions>
              <Button onClick={this.handleReload}>
                Refresh Page
              </Button>
              <Button 
                onClick={this.handleGoHome}
                style={{ backgroundColor: '#6c757d' }}
              >
                Go Home
              </Button>
            </ErrorActions>
          </ErrorContainer>
        </PageLayout>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallbackMessage: PropTypes.string
};

export default ErrorBoundary;

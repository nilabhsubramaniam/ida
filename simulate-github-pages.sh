#!/bin/bash
# Create a minimal test environment that simulates GitHub Pages behavior

echo "==============================================="
echo "  GitHub Pages Simulator"
echo "==============================================="

# Configuration
TEST_DIR="/tmp/github-pages-test"
PORT=4202

# Create test directory structure
echo "Creating test environment in $TEST_DIR..."
mkdir -p "$TEST_DIR"

# Create a basic index.html with meta redirect
cat > "$TEST_DIR/index.html" << EOL
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Test - GitHub Pages Simulator</title>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <meta http-equiv="refresh" content="0;url=/ida/#/">
</head>
<body>
  <h2>Redirecting to app...</h2>
  <p>If you're not redirected, <a href="/ida/#/">click here</a>.</p>
</body>
</html>
EOL

# Create a 404.html with meta redirect
cat > "$TEST_DIR/404.html" << EOL
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>404 - Page Not Found</title>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <meta http-equiv="refresh" content="0;url=/ida/#/">
</head>
<body>
  <h2>Page not found</h2>
  <p>Redirecting to <a href="/ida/#/">homepage</a>...</p>
</body>
</html>
EOL

# Create app directory with index.html
mkdir -p "$TEST_DIR/ida"
cat > "$TEST_DIR/ida/index.html" << EOL
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>SPA Application</title>
  <script>
    // Simple hash router
    function handleRoute() {
      const hash = window.location.hash || '#/';
      const path = hash.substring(2); // Remove '#/'
      document.getElementById('current-route').textContent = path || 'home';
    }
    
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('load', handleRoute);
  </script>
</head>
<body>
  <h1>SPA Application</h1>
  <p>Current route: <strong id="current-route">home</strong></p>
  
  <nav>
    <ul>
      <li><a href="#/">Home</a></li>
      <li><a href="#/about">About</a></li>
      <li><a href="#/login">Login</a></li>
      <li><a href="#/dashboard">Dashboard</a></li>
    </ul>
  </nav>
  
  <div>
    <h3>Testing tools:</h3>
    <button onclick="window.location.href='/ida/non-existent-page'">Test 404 handling</button>
    <button onclick="window.location.href='/'">Test root redirect</button>
  </div>
  
  <div>
    <h3>Redirect loop detection:</h3>
    <pre id="redirect-info">No redirects detected</pre>
    
    <script>
      // Check if we've been redirected
      const now = new Date().getTime();
      const lastRedirect = sessionStorage.getItem('lastRedirect');
      const redirectCount = parseInt(sessionStorage.getItem('redirectCount') || '0');
      
      if (lastRedirect && (now - parseInt(lastRedirect)) < 1000) {
        // Less than 1 second since last redirect - possible loop
        sessionStorage.setItem('redirectCount', (redirectCount + 1).toString());
      } else {
        // Reset counter for new page visit
        sessionStorage.setItem('redirectCount', '1');
      }
      
      sessionStorage.setItem('lastRedirect', now.toString());
      
      // Display info
      document.getElementById('redirect-info').textContent = 
        \`Redirect count: \${redirectCount}
URL: \${window.location.href}
Time: \${new Date().toLocaleTimeString()}\`;
      
      // Alert if too many redirects
      if (redirectCount > 5) {
        alert('Warning: Multiple rapid redirects detected! Possible redirect loop.');
      }
    </script>
  </div>
</body>
</html>
EOL

# Create .nojekyll file
touch "$TEST_DIR/.nojekyll"

# Function to check if a command exists
command_exists() {
  command -v "$1" &> /dev/null
}

# Start a server
if command_exists python3; then
  echo "Starting server with Python 3..."
  python3 -m http.server --directory "$TEST_DIR" $PORT
elif command_exists python; then
  echo "Starting server with Python..."
  python -m SimpleHTTPServer $PORT
else
  echo "Error: Python is not available. Cannot start test server."
  echo "Your test environment is still available at: $TEST_DIR"
  exit 1
fi

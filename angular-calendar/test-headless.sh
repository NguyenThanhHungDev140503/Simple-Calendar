#!/bin/bash

# Script to find Chrome/Chromium binary using 'which' command and run Angular tests

echo "Searching for Chrome/Chromium binary..."

# Try to find Chrome/Chromium using which command
CHROME_BIN=$(which google-chrome || which chromium-browser || which chromium || which google-chrome-stable 2>/dev/null)

if [ -z "$CHROME_BIN" ]; then
    echo "Error: No Chrome/Chromium binary found on this system"
    echo "Please install one of the following:"
    echo "  - Google Chrome: sudo apt install google-chrome-stable"
    echo "  - Chromium (snap): sudo snap install chromium" 
    echo "  - Chromium (apt): sudo apt install chromium-browser"
    exit 1
fi

echo "Found Chrome binary at: $CHROME_BIN"
echo "Running Angular tests with ChromeHeadlessCI..."

# Export the Chrome binary path and run tests
export CHROME_BIN="$CHROME_BIN"
ng test --browsers=ChromeHeadlessCI --watch=false

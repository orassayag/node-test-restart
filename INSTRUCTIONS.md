# Instructions

**Version:** 0.1.0  
**Last Updated:** May 26, 2026

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Configuration](#configuration)
4. [Running Scripts](#running-scripts)
5. [Available Commands](#available-commands)
6. [How It Works](#how-it-works)
7. [File Structure](#file-structure)
8. [Testing Scenarios](#testing-scenarios)
9. [Development](#development)
10. [Extending the Application](#extending-the-application)
11. [Best Practices](#best-practices)
12. [Troubleshooting](#troubleshooting)
13. [Documentation](#documentation)
14. [External Resources](#external-resources)

## Prerequisites

### System Requirements

- **Node.js**: Version 8.0.0 or higher
- **Package Manager**: npm (v6+) or yarn
- **Operating System**: Windows (required for `npm run stop`), macOS, or Linux
- **Memory**: 512MB RAM minimum
- **Disk Space**: 50MB for application and dependencies

## Initial Setup

### 1. Install Dependencies

To get started, clone the repository and install the required NPM packages:

```bash
git clone https://github.com/orassayag/node-test-restart.git
cd node-test-restart
npm install
```

## Setup and Usage Instructions

## Setup Instructions

1. Open the project in your IDE (VSCode recommended)
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Open `src/settings/settings.js`
2. Configure the settings according to your needs:
   - `NODE_ENV`: Environment mode (default: 'development')
   - `SERVER_PORT`: Port for the HTTP server (default: 3001)

3. Open `src/monitor.js` to adjust monitor settings:
   - `max`: Maximum number of restarts before stopping (default: 10)
   - `silent`: Whether to suppress output (default: false)

## Running Scripts

### Start Monitor

Starts the forever-monitor which watches and restarts the server process:

```bash
npm start
```

**What it does:**

- Starts the server process using forever-monitor
- Automatically restarts the server when it exits (up to max restarts)
- Tracks the number of restarts
- Passes restart count to the server process as an argument

### Stop All Node Processes (Windows)

Forcefully stops all running Node.js processes:

```bash
npm run stop
```

**Note:** This command is Windows-specific and uses `taskkill`.

### Debug Mode

Starts the server in debug mode with breakpoint support:

```bash
npm run debug
```

**What it does:**

- Starts the server directly (without monitor)
- Enables Node.js inspector on default port (9229)
- Pauses execution at start for debugger attachment

## Available Commands

### Production-like Commands

| Command        | Description                                           |
| -------------- | ----------------------------------------------------- |
| `npm start`    | Starts the forever-monitor and the server process     |
| `npm run stop` | Forcefully kills all Node.js processes (Windows only) |

### Development Commands

| Command          | Description                                         |
| ---------------- | --------------------------------------------------- |
| `npm run debug`  | Starts the server in debug mode with Node inspector |
| `npm run lint`   | (If configured) Checks code style and quality       |
| `npm run format` | (If configured) Formats code using Prettier         |

## How It Works

### Process Flow

```
Start npm start
    ↓
Monitor starts server.js
    ↓
Server starts HTTP listener on port 3001
    ↓
After 1 second, server exits with code 2
    ↓
Monitor detects exit
    ↓
Monitor restarts server (increments counter)
    ↓
Process repeats until max restarts reached
```

### Exit Code Behavior

The monitor handles exit codes differently:

- **Exit code 1**: Monitor stops and does NOT restart the process
- **Exit code 2 (or other)**: Monitor restarts the process automatically
- **Max restarts reached**: Monitor stops after reaching the limit

### Restart Counter

The restart counter:

- Starts at 0 on first run
- Increments after each restart
- Is passed to the server process as `process.argv[2]`
- Can be accessed in the server code

## File Structure

### Source Files (`src/`)

- `monitor.js` - Forever-monitor configuration and restart logic
- `server.js` - HTTP server that deliberately exits for testing
- `settings/settings.js` - Server configuration (port, environment)
- `services/error.service.js` - Error handling utilities

### Entry Point

- `server.js` (root) - Simple entry point that requires `src/server.js`

## Testing Scenarios

### Test 1: Normal Restart

1. Run `npm start`
2. Observe the server starting and exiting
3. Verify it restarts automatically
4. Check the restart counter increments

### Test 2: Max Restarts

1. Set `max: 3` in `src/monitor.js`
2. Run `npm start`
3. Verify the monitor stops after 3 restarts

### Test 3: Stop on Exit Code 1

1. Change `process.exit(2)` to `process.exit(1)` in `src/server.js`
2. Run `npm start`
3. Verify the monitor does NOT restart the server

### Test 4: Server Port Configuration

1. Change `SERVER_PORT` in `src/settings/settings.js`
2. Run `npm start`
3. Verify the server starts on the new port

## Development

### Understanding the Code

**monitor.js:**

- Creates a Forever monitor instance
- Watches `server.js` file
- Handles `restart` and `exit:code` events
- Manages restart counter

**server.js:**

- Creates HTTP server
- Listens on configured port
- Handles server errors (EACCES, EADDRINUSE)
- Deliberately exits after 1 second for testing

**error.service.js:**

- Extracts error details
- Formats error information
- Used for debugging and logging

## Extending the Application

To add new functionality or change behavior:

1. **Modify Exit Logic**: Update `src/server.js` to change when and how the server exits.
2. **Add Services**: Create new files in `src/services/` and import them into `server.js`.
3. **Change Monitor Settings**: Update `src/monitor.js` to adjust restart intervals, log files, or max attempts.
4. **Environment Variables**: Add new settings to `src/settings/settings.js` and use them throughout the app.

## Best Practices

- **Monitoring Strategy**: Use the monitor process for any application that needs to stay alive 24/7.
- **Log Management**: In a real production app, redirect monitor logs to a file instead of just stdout.
- **Health Checks**: Implement a `/health` endpoint in `server.js` to allow external monitors to check status.
- **Exit Code Standards**:
  - `0`: Successful exit (no restart needed)
  - `1`: Fatal error (manual intervention required, no auto-restart)
  - `>1`: Recoverable error (auto-restart recommended)

## Troubleshooting

## Common Issues

### Port Already in Use

If you see "port 3001 is already in use":

1. Change `SERVER_PORT` in `src/settings/settings.js`
2. Or stop the process using that port
3. On Windows, use `npm run stop` to kill all Node processes

### Monitor Won't Stop

If the monitor keeps running:

1. Press `Ctrl+C` to stop the terminal process
2. On Windows, use `npm run stop` to ensure the child process is also killed
3. Check if `silent: false` in `src/monitor.js` for output visibility

### No Output Visible

If you don't see any console output:

1. Set `silent: false` in `src/monitor.js`
2. Ensure you're running `npm start` not `node server.js`

## Documentation

- **README.md**: Overview, architecture diagrams, and quick start guide.
- **CHANGELOG.md**: History of changes and version updates.
- **CONTRIBUTING.md**: Guidelines for contributing to this project.
- **LICENSE**: Legal information regarding project usage.

## External Resources

- **forever-monitor**: [GitHub Repository](https://github.com/foreversd/forever-monitor)
- **Node.js Child Processes**: [Node.js Documentation](https://nodejs.org/api/child_process.html)
- **taskkill**: [Microsoft Documentation](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/taskkill)

## Notes

- This is a test/demonstration project for understanding `forever-monitor` behavior
- The server is designed to exit intentionally for testing purposes
- In production, you would not deliberately exit the process
- The HTTP server itself doesn't serve any routes or content
- Restart functionality is handled entirely by the `forever-monitor` package

## Author

- **Or Assayag** - _Initial work_ - [orassayag](https://github.com/orassayag)
- Or Assayag <orassayag@gmail.com>
- GitHub: https://github.com/orassayag
- StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
- LinkedIn: https://linkedin.com/in/orassayag

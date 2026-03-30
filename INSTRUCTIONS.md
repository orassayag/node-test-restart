# Instructions

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

## Common Issues

### Port Already in Use
If you see "port 3001 is already in use":
1. Change `SERVER_PORT` in settings
2. Or stop the process using that port
3. On Windows, use `npm run stop` to kill all Node processes

### Monitor Won't Stop
If the monitor keeps running:
1. Press `Ctrl+C` to stop
2. On Windows, use `npm run stop`
3. Check if `silent: false` in monitor.js for output visibility

### No Output Visible
If you don't see any console output:
1. Set `silent: false` in `src/monitor.js`
2. Ensure you're running `npm start` not `node server.js`

## Notes

- This is a test/demonstration project for understanding `forever-monitor` behavior
- The server is designed to exit intentionally for testing purposes
- In production, you would not deliberately exit the process
- The HTTP server itself doesn't serve any routes or content
- Restart functionality is handled entirely by the `forever-monitor` package

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

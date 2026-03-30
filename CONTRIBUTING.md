# Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE).

Everyone is welcome to contribute to this project. Contributing doesn't just mean submitting pull requests—there are many different ways for you to get involved, including answering questions, reporting issues, improving documentation, or suggesting new features.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:
1. Check if the issue already exists in the [GitHub Issues](https://github.com/orassayag/node-test-restart/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Error messages (if applicable)
   - Your environment details (OS, Node version)

### Submitting Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following the code style guidelines below
4. Test your changes thoroughly
5. Commit with clear, descriptive messages
6. Push to your fork and submit a pull request

### Code Style Guidelines

This project uses:
- **JavaScript (Node.js)** with ES6+ syntax
- **ESLint** for code quality

Before submitting:
```bash
# Check for linting errors
npm run lint

# Test the monitor functionality
npm start
```

### Coding Standards

1. **Clean code**: Write simple, readable, and maintainable code
2. **Error handling**: Properly handle errors and edge cases
3. **Descriptive naming**: Use clear, descriptive names for variables and functions
4. **Minimal comments**: Code should be self-explanatory; add comments only for non-obvious logic
5. **No empty lines inside functions**: Keep function bodies concise

### Adding New Features

When adding new features:
1. Update relevant files in `src/` directory
2. Test thoroughly with different scenarios
3. Update documentation (README.md, INSTRUCTIONS.md)
4. Ensure backward compatibility when possible

### Testing

When testing changes:
1. Test the restart functionality with different exit codes
2. Verify the restart counter works correctly
3. Test with different max restart limits
4. Ensure the server starts and stops properly

## Questions or Need Help?

Please feel free to contact me with any question, comment, pull-request, issue, or any other thing you have in mind.

* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

Thank you for contributing! 🙏

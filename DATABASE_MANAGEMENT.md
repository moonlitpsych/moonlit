# Moonlit Database Management Guide

This guide will help you manage your provider and insurance data easily, even if you're not a developer.

## Quick Start

All database commands can be run using `npm run db` followed by the command you want to run. Here are the main commands you'll use:

### Switching Between Test and Live Modes

```bash
npm run db switch-mode test    # Switch to test mode
npm run db switch-mode live    # Switch to live mode
```

### Managing Providers

1. **Import Providers from CSV**
   ```bash
   npm run db import-providers path/to/your/providers.csv
   ```
   Your CSV should have columns matching the provider fields (firstName, lastName, email, etc.)

2. **Export Providers to CSV**
   ```bash
   npm run db export-providers output.csv
   ```
   This will create a CSV file with all provider data.

3. **Search for Providers**
   ```bash
   npm run db search-providers "search term"
   ```
   This will search across provider names, emails, and specialties.

### Managing Insurance Relationships

1. **Link a Provider with an Insurance**
   ```bash
   npm run db link-provider-payer "provider@email.com" "insurance-name"
   ```

## CSV File Format

When importing providers, your CSV file should have these columns:
- firstName
- lastName
- email (required)
- phone
- title (e.g., MD, DO, NP)
- specialty
- licenseNumber
- state
- npi (National Provider Identifier)
- practiceName
- practiceAddress
- practicePhone
- practiceEmail
- languages (comma-separated)
- specialties (comma-separated)
- photoUrl
- personalBookingUrl

Example:
```csv
firstName,lastName,email,title,specialty
John,Doe,john@example.com,MD,"Psychiatry"
Jane,Smith,jane@example.com,NP,"Mental Health"
```

## Best Practices

1. **Always Test First**: Use test mode when making changes to verify everything works as expected.
2. **Regular Backups**: Export your data regularly using the export command.
3. **Validate Data**: Double-check CSV files before importing to ensure all required fields are present.
4. **Keep Records**: Maintain a log of when you make significant changes to the database.

## Common Tasks

### Adding a New Provider

1. Create a CSV file with the provider's information
2. Switch to test mode: `npm run db switch-mode test`
3. Import the provider: `npm run db import-providers new-provider.csv`
4. Verify the import: `npm run db search-providers "provider@email.com"`
5. If everything looks good, switch to live mode and repeat the import

### Updating Provider Information

1. Export current data: `npm run db export-providers current.csv`
2. Make changes in the CSV file
3. Test the import in test mode
4. When ready, import to live mode

### Managing Insurance Relationships

1. Search for the provider: `npm run db search-providers "provider@email.com"`
2. Link them with insurance: `npm run db link-provider-payer "provider@email.com" "insurance-name"`

## Need Help?

If you encounter any issues or need assistance:
1. Check the error message - it often tells you exactly what's wrong
2. Verify you're in the correct mode (test/live)
3. Double-check your CSV file format
4. Reach out to your development team for support 
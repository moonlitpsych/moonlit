# Setting Up Provider Information

## Environment Setup
1. Copy `.env.example` to `.env`
2. Set up your database URLs:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/moonlit"
   TEST_DATABASE_URL="postgresql://user:password@localhost:5432/moonlit_test"
   ```
3. Set `DATA_MODE="live"` for live data

## Adding Live Providers
1. Run the provider management script:
   ```bash
   npm run manage:providers
   ```

2. Follow the interactive prompts to enter provider details:
   - Basic Information:
     - First Name
     - Last Name
     - Title (MD/DO/NP/PA)
     - Email
     - Phone
     - Specialty
     - Bio
     - Languages (comma-separated)
     - Specialties (comma-separated)
     - Photo URL

   - Education History (for each entry):
     - Institution
     - Degree
     - Field
     - Start Date (YYYY-MM-DD)
     - End Date (YYYY-MM-DD)

3. Verify the data in Prisma Studio:
   ```bash
   npm run prisma:studio
   ```
   Navigate to http://localhost:5555 to view and edit the data.

## Best Practices
1. Provider Photos:
   - Use professional headshots
   - Recommended size: 400x400 pixels
   - Format: PNG or JPG
   - Max file size: 200KB

2. Bio Guidelines:
   - Keep it professional but warm
   - Include areas of expertise
   - Mention treatment approaches
   - 100-200 words recommended

3. Education Entries:
   - List most recent first
   - Include all relevant certifications
   - Use full institution names
   - Specify exact dates if available

## Switching Between Test/Live Data
- For testing: Set `DATA_MODE="test"` in `.env`
- For production: Set `DATA_MODE="live"` in `.env`
- Restart the application after changing modes 
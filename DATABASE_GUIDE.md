# DWEL Database Integration Guide

## 📋 Overview

This project uses the **RESTful Table API** to store and manage investor inquiries submitted through the contact form. All data is persisted automatically without requiring a custom backend server.

---

## 🗄️ Database Schema

### Table: `investor_inquiries`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | text | Auto | Unique identifier (UUID) |
| `name` | text | Yes | Full name of the investor |
| `email` | text | Yes | Email address |
| `organization` | text | No | Company/organization name |
| `interest` | text | Yes | Type of investment (seed, series-a, strategic, general) |
| `message` | rich_text | Yes | Detailed inquiry message |
| `submitted_at` | datetime | Auto | When the form was submitted |
| `status` | text | Auto | Follow-up status (new, contacted, meeting_scheduled, closed) |

### System-Managed Fields

These fields are automatically managed by the system:

- `gs_project_id` - Project identifier
- `gs_table_name` - Table name
- `created_at` - Record creation timestamp (milliseconds since epoch)
- `updated_at` - Last update timestamp (milliseconds since epoch)

---

## 🔄 Data Flow

### 1. Contact Form Submission (`index.html`)

When a user submits the contact form:

```javascript
// Form data is collected
const formData = {
    name: "John Investor",
    email: "john@investment.com",
    organization: "ABC Capital",
    interest: "series-a",
    message: "Interested in learning more...",
    submitted_at: new Date().toISOString(),
    status: "new"
};

// Data is sent to the API
const response = await fetch('tables/investor_inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```

### 2. Admin Dashboard Access (`admin.html`)

The admin dashboard automatically loads and displays all inquiries:

```javascript
// Fetch all inquiries
const response = await fetch('tables/investor_inquiries?limit=1000&sort=-created_at');
const result = await response.json();

// Result structure:
{
    data: [...],        // Array of inquiry records
    total: 25,          // Total number of records
    page: 1,            // Current page
    limit: 1000,        // Records per page
    table: "investor_inquiries",
    schema: {...}       // Table schema
}
```

### 3. Status Updates

Admins can update the status of inquiries:

```javascript
// Update inquiry status
await fetch(`tables/investor_inquiries/${recordId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'contacted' })
});
```

---

## 📡 API Endpoints

### GET - List All Inquiries

```
GET tables/investor_inquiries
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Records per page (default: 100)
- `search` - Search query string
- `sort` - Sort field (use `-` prefix for descending, e.g., `-created_at`)

**Example:**
```javascript
fetch('tables/investor_inquiries?page=1&limit=20&sort=-created_at')
```

**Response:**
```json
{
    "data": [
        {
            "id": "uuid-here",
            "name": "John Investor",
            "email": "john@investment.com",
            "organization": "ABC Capital",
            "interest": "series-a",
            "message": "Interested in...",
            "submitted_at": "2025-10-22T19:00:00Z",
            "status": "new",
            "created_at": 1729624800000,
            "updated_at": 1729624800000
        }
    ],
    "total": 1,
    "page": 1,
    "limit": 20
}
```

---

### GET - Single Inquiry

```
GET tables/investor_inquiries/{record_id}
```

**Example:**
```javascript
fetch('tables/investor_inquiries/abc-123-def-456')
```

**Response:** Single record object

---

### POST - Create New Inquiry

```
POST tables/investor_inquiries
```

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
    "name": "John Investor",
    "email": "john@investment.com",
    "organization": "ABC Capital",
    "interest": "series-a",
    "message": "I would like to learn more...",
    "submitted_at": "2025-10-22T19:00:00Z",
    "status": "new"
}
```

**Response:** Created record with system fields (HTTP 201)

---

### PATCH - Update Inquiry (Partial)

```
PATCH tables/investor_inquiries/{record_id}
```

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
    "status": "contacted"
}
```

**Response:** Updated record object

---

### PUT - Update Inquiry (Full)

```
PUT tables/investor_inquiries/{record_id}
```

Replaces all fields (except system fields). Use PATCH for partial updates.

---

### DELETE - Delete Inquiry

```
DELETE tables/investor_inquiries/{record_id}
```

**Response:** HTTP 204 (No Content)

**Note:** This performs a soft delete (sets `deleted=true` flag)

---

## 🎯 Admin Dashboard Features

### Statistics Dashboard

The admin page displays real-time statistics:

- **Total Inquiries** - All submissions
- **New** - Unread inquiries (status = 'new')
- **Contacted** - Inquiries that have been contacted
- **Meeting Scheduled** - Inquiries with scheduled meetings

### Search & Filter

**Search by:**
- Name
- Email address
- Organization name

**Filter by status:**
- All
- New
- Contacted
- Meeting Scheduled
- Closed

### Pagination

- 10 records per page (configurable)
- Previous/Next navigation
- Page number display

### Inquiry Details

Click "View" to see complete inquiry details in a modal:

- Full contact information
- Complete message text
- Submission timestamp
- Ability to update status

### Status Management

Four status levels for tracking:

1. **New** - Initial status when inquiry is submitted
2. **Contacted** - Admin has reached out to the investor
3. **Meeting Scheduled** - Meeting arranged with investor
4. **Closed** - Inquiry completed or declined

---

## 🔒 Security Considerations

### Current Implementation

- ✅ Data validation on client-side
- ✅ HTTPS required for production
- ✅ RESTful API with built-in security

### Recommended Additions

1. **Admin Authentication**
   ```
   - Add password protection to admin.html
   - Implement OAuth/SSO for enterprise
   - IP whitelist for admin access
   ```

2. **Rate Limiting**
   ```
   - Prevent spam submissions
   - Limit API requests per IP
   - Implement CAPTCHA on contact form
   ```

3. **Data Privacy**
   ```
   - GDPR compliance notices
   - Data retention policies
   - Encryption at rest
   ```

4. **Email Verification**
   ```
   - Verify email addresses
   - Send confirmation emails
   - Prevent fake submissions
   ```

---

## 🧪 Testing the Database

### Test Form Submission

1. Open `index.html` in a browser
2. Navigate to the Contact section
3. Fill out the form with test data
4. Submit the form
5. Verify success message appears

### Test Admin Dashboard

1. Open `admin.html` in a browser
2. Verify the inquiry appears in the table
3. Test search functionality
4. Test filter buttons
5. Click "View" to open inquiry details
6. Update status and verify it saves

### Test API Directly

Using browser console or API testing tool:

```javascript
// Create a test inquiry
fetch('tables/investor_inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        organization: "Test Co",
        interest: "general",
        message: "This is a test",
        submitted_at: new Date().toISOString(),
        status: "new"
    })
})
.then(res => res.json())
.then(data => console.log('Created:', data));

// List all inquiries
fetch('tables/investor_inquiries')
    .then(res => res.json())
    .then(data => console.log('All inquiries:', data));
```

---

## 📊 Data Export

Currently, data can be viewed through:
1. Admin dashboard interface
2. API endpoints (programmatic access)

### Future Enhancements

- CSV export functionality
- Excel export with formatting
- PDF reports generation
- Email reports (scheduled)

---

## 🔧 Troubleshooting

### Issue: Form submission fails

**Possible causes:**
- Network connectivity issues
- API endpoint not accessible
- Invalid data format

**Solution:**
1. Check browser console for errors
2. Verify API endpoint URL is correct
3. Test with a simple API call

### Issue: Admin dashboard shows no data

**Possible causes:**
- No inquiries have been submitted yet
- API request failing
- Table schema not initialized

**Solution:**
1. Submit a test inquiry first
2. Check browser console for errors
3. Verify table exists with API call

### Issue: Status update not saving

**Possible causes:**
- Network issues
- Invalid record ID
- Permission issues

**Solution:**
1. Check browser console for errors
2. Refresh the page and try again
3. Verify record ID is correct

---

## 📞 Support

For technical questions or issues:

1. Check browser console for error messages
2. Review API response in Network tab
3. Verify table schema is correct
4. Contact technical support

---

## 🚀 Future Enhancements

### Planned Features

1. **Email Notifications**
   - Auto-notify admin on new submission
   - Send confirmation to investor

2. **Advanced Analytics**
   - Response time tracking
   - Conversion metrics
   - Investment type distribution

3. **CRM Integration**
   - Sync with Salesforce
   - HubSpot integration
   - Custom CRM webhooks

4. **Export Features**
   - CSV download
   - PDF reports
   - Scheduled email reports

5. **Mobile App**
   - iOS/Android admin app
   - Push notifications
   - On-the-go inquiry management

---

**Last Updated:** October 2025  
**Version:** 1.0.0
// ============================================
// DWEL Admin Dashboard - JavaScript
// ============================================

let allInquiries = [];
let filteredInquiries = [];
let currentPage = 1;
let itemsPerPage = 10;
let currentFilter = 'all';
let currentRecordId = null;

// ============================================
// Initialize Dashboard
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    loadInquiries();
    setupEventListeners();
});

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        filterInquiries();
    });
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter
            currentFilter = this.getAttribute('data-filter');
            currentPage = 1;
            filterInquiries();
        });
    });
    
    // Close modal on outside click
    const modal = document.getElementById('detailModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// ============================================
// Load Inquiries from Database
// ============================================
async function loadInquiries() {
    const loadingState = document.getElementById('loadingState');
    const tableContent = document.getElementById('tableContent');
    const emptyState = document.getElementById('emptyState');
    
    loadingState.style.display = 'block';
    tableContent.style.display = 'none';
    emptyState.style.display = 'none';
    
    try {
        // Fetch all inquiries with pagination
        const response = await fetch('tables/contact_inquiries?limit=1000&sort=-created_at');
        
        if (!response.ok) {
            throw new Error('Failed to fetch inquiries');
        }
        
        const result = await response.json();
        allInquiries = result.data || [];
        
        console.log('Loaded inquiries:', allInquiries);
        
        // Update statistics
        updateStatistics();
        
        // Filter and display
        filterInquiries();
        
        loadingState.style.display = 'none';
        
        if (allInquiries.length === 0) {
            emptyState.style.display = 'block';
        } else {
            tableContent.style.display = 'block';
        }
        
    } catch (error) {
        console.error('Error loading inquiries:', error);
        loadingState.innerHTML = `
            <i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i>
            <p style="color: #ef4444;">Error loading inquiries. Please try again.</p>
            <button class="btn btn-primary" onclick="loadInquiries()" style="margin-top: 1rem;">Retry</button>
        `;
    }
}

// ============================================
// Update Statistics
// ============================================
function updateStatistics() {
    const totalCount = allInquiries.length;
    const newCount = allInquiries.filter(i => i.status === 'new').length;
    const inProgressCount = allInquiries.filter(i => i.status === 'in_progress').length;
    const respondedCount = allInquiries.filter(i => i.status === 'responded').length;
    
    document.getElementById('totalCount').textContent = totalCount;
    document.getElementById('newCount').textContent = newCount;
    document.getElementById('inProgressCount').textContent = inProgressCount;
    document.getElementById('respondedCount').textContent = respondedCount;
}

// ============================================
// Filter Inquiries
// ============================================
function filterInquiries() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    // Apply status filter
    if (currentFilter === 'all') {
        filteredInquiries = [...allInquiries];
    } else {
        filteredInquiries = allInquiries.filter(inquiry => inquiry.status === currentFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
        filteredInquiries = filteredInquiries.filter(inquiry => {
            return (
                inquiry.name.toLowerCase().includes(searchTerm) ||
                inquiry.email.toLowerCase().includes(searchTerm) ||
                inquiry.company.toLowerCase().includes(searchTerm)
            );
        });
    }
    
    // Reset to page 1
    currentPage = 1;
    
    // Display results
    displayInquiries();
}

// ============================================
// Display Inquiries in Table
// ============================================
function displayInquiries() {
    const tableBody = document.getElementById('tableBody');
    const emptyState = document.getElementById('emptyState');
    const tableContent = document.getElementById('tableContent');
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageInquiries = filteredInquiries.slice(startIndex, endIndex);
    
    // Update pagination info
    document.getElementById('currentPage').textContent = totalPages === 0 ? 0 : currentPage;
    document.getElementById('totalPages').textContent = totalPages;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages || totalPages === 0;
    
    // Show empty state if no results
    if (filteredInquiries.length === 0) {
        tableContent.style.display = 'none';
        emptyState.style.display = 'block';
        emptyState.innerHTML = `
            <i class="fas fa-search"></i>
            <h3>No Results Found</h3>
            <p>Try adjusting your search or filter criteria.</p>
        `;
        return;
    }
    
    emptyState.style.display = 'none';
    tableContent.style.display = 'block';
    
    // Clear table
    tableBody.innerHTML = '';
    
    // Populate table
    pageInquiries.forEach(inquiry => {
        const row = document.createElement('tr');
        
        const date = new Date(inquiry.submitted_at || inquiry.created_at);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const interestLabels = {
            'employer': 'Employer - Add to Benefits',
            'employee': 'Employee - Learn More',
            'partnership': 'Partnership Opportunity',
            'press': 'Press/Media Inquiry',
            'general': 'General Question'
        };
        
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td><strong>${escapeHtml(inquiry.name)}</strong></td>
            <td>${escapeHtml(inquiry.email)}</td>
            <td>${escapeHtml(inquiry.company)}</td>
            <td>${interestLabels[inquiry.inquiry] || inquiry.inquiry}</td>
            <td><span class="status-badge status-${inquiry.status}">${formatStatus(inquiry.status)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn primary" onclick="viewInquiry('${inquiry.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// ============================================
// View Inquiry Details
// ============================================
function viewInquiry(inquiryId) {
    const inquiry = allInquiries.find(i => i.id === inquiryId);
    
    if (!inquiry) {
        alert('Inquiry not found');
        return;
    }
    
    currentRecordId = inquiryId;
    
    // Populate modal
    const date = new Date(inquiry.submitted_at || inquiry.created_at);
    const formattedDate = date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
    
    const interestLabels = {
        'employer': 'Employer - Add to Benefits',
        'employee': 'Employee - Learn More',
        'partnership': 'Partnership Opportunity',
        'press': 'Press/Media Inquiry',
        'general': 'General Question'
    };
    
    document.getElementById('modalName').textContent = inquiry.name;
    document.getElementById('modalEmail').textContent = inquiry.email;
    document.getElementById('modalCompany').textContent = inquiry.company;
    document.getElementById('modalInquiry').textContent = interestLabels[inquiry.inquiry] || inquiry.inquiry;
    document.getElementById('modalMessage').textContent = inquiry.message;
    document.getElementById('modalDate').textContent = formattedDate;
    document.getElementById('modalStatus').value = inquiry.status;
    
    // Show modal
    document.getElementById('detailModal').classList.add('active');
}

// ============================================
// Close Modal
// ============================================
function closeModal() {
    document.getElementById('detailModal').classList.remove('active');
    currentRecordId = null;
}

// ============================================
// Update Status
// ============================================
async function updateStatus() {
    if (!currentRecordId) return;
    
    const newStatus = document.getElementById('modalStatus').value;
    
    try {
        const response = await fetch(`tables/contact_inquiries/${currentRecordId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: newStatus
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to update status');
        }
        
        const result = await response.json();
        console.log('Status updated:', result);
        
        // Update local data
        const inquiry = allInquiries.find(i => i.id === currentRecordId);
        if (inquiry) {
            inquiry.status = newStatus;
        }
        
        // Update statistics and table
        updateStatistics();
        displayInquiries();
        
        // Show success message
        showNotification('Status updated successfully', 'success');
        
    } catch (error) {
        console.error('Error updating status:', error);
        showNotification('Failed to update status', 'error');
    }
}

// ============================================
// Refresh Data
// ============================================
async function refreshData() {
    await loadInquiries();
    showNotification('Data refreshed', 'success');
}

// ============================================
// Pagination
// ============================================
function changePage(direction) {
    const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        displayInquiries();
    }
}

// ============================================
// Utility Functions
// ============================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatStatus(status) {
    const statusMap = {
        'new': 'New',
        'in_progress': 'In Progress',
        'responded': 'Responded',
        'closed': 'Closed'
    };
    return statusMap[status] || status;
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
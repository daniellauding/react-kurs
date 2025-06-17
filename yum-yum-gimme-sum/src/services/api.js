const API_BASE = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com';

class ApiService {
  constructor() {
    this.apiKey = null;
    this.tenantId = null;
  }

  async getApiKey() {
    if (this.apiKey) return this.apiKey;
    
    try {
      const response = await fetch(`${API_BASE}/keys`, {
        method: 'POST'
      });
      const data = await response.json();
      console.log('API Key response:', data);
      this.apiKey = data.key;
      return this.apiKey;
    } catch (error) {
      console.error('Failed to get API key:', error);
      throw error;
    }
  }

  async createTenant(name) {
    if (!this.apiKey) await this.getApiKey();
    
    try {
      console.log('Creating tenant with name:', name);
      const response = await fetch(`${API_BASE}/tenants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-zocom': this.apiKey
        },
        body: JSON.stringify({ name })
      });
      
      console.log('Tenant response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Tenant creation failed:', errorText);
        
        // Handle case where tenant already exists
        if (response.status === 400 && errorText.includes('already exists')) {
          console.log('Tenant already exists, using existing tenant:', name);
          // Use the tenant name as ID - this is a common pattern
          this.tenantId = name;
          return { id: name, name: name, existing: true };
        }
        
        throw new Error(`Failed to create tenant: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Tenant response data:', data);
      this.tenantId = data.id;
      return data;
    } catch (error) {
      console.error('Failed to create tenant:', error);
      throw error;
    }
  }

  async request(endpoint, options = {}) {
    if (!this.apiKey) await this.getApiKey();
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-zocom': this.apiKey,
        ...options.headers
      }
    };

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API request failed: ${endpoint}`, errorText);
        throw new Error(`API request failed: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      console.log(`API response for ${endpoint}:`, data);
      return data;
    } catch (error) {
      console.error(`Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async getMenu() {
    return this.request('/menu');
  }

  async createOrder(orderData) {
    return this.request(`/${this.tenantId}/orders`, {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  async getOrders() {
    return this.request(`/${this.tenantId}/orders`);
  }
}

export const apiService = new ApiService(); 